import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, Inject, ViewContainerRef } from '@angular/core';
import { Markup } from '../markup';
import { Observable, of, fromEvent } from 'rxjs';
import { switchMap, subscribeOn, takeUntil, pairwise } from 'rxjs/operators';
import { Polygon } from './polygon';
import { ColorConvert } from './color-convert';
import { MatSelectModule } from '@angular/material/select';
import { BuildingComplex } from '../one/building-complex';

@Component({
  selector: 'app-canvas-drawer',
  templateUrl: './canvas-drawer.component.html',
  styleUrls: ['./canvas-drawer.component.css']
})
export class CanvasDrawerComponent implements AfterViewInit {

  @ViewChild('canvas') public canvas: ElementRef;
  @ViewChild('canvasImage') public canvasImage: ElementRef;
  @ViewChild('info') public info: ElementRef;

  @Input() markup: Markup;
  @Input() buildingComplex: BuildingComplex;

  private cx: CanvasRenderingContext2D;
  private imageCx: CanvasRenderingContext2D;

  private img;

  private polygons: Polygon[] = [];

  private color = new ColorConvert();

  private colors: String[] = [
    'pink',
    'lime',
    'violet',
    'crimson',
    'deeppink',
    'mediumpurple',
    'darkred',
    'mediumvioletred',
    'green',
    'orange',
    'aqua',
    'yellow',
    'darkkhaki',
    'teal',
    'brown',
    'deepskyblue',
    'blue',
    'slategray'
  ]

  private isDrawing: boolean = false;
  private currentPolygon: Polygon;

  ngOnInit() {
    if (this.markup) {
      const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
      const canvasImageEl: HTMLCanvasElement = this.canvasImage.nativeElement;

      this.cx = canvasEl.getContext('2d');
      this.imageCx = canvasImageEl.getContext('2d');

      this.img = new Image();
      this.img.src = this.markup.link;
      this.img.onload = () => {
        let icasoc = this.getImageCoordinatesAndSizeOnCanvas(canvasEl, this.img);
        this.imageCx.drawImage(this.img, icasoc.x, icasoc.y, icasoc.width, icasoc.height);
      }
    }



  }

  ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    this.cx.lineWidth = 1;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';

    if (this.markup) {

      this.markup.buildingImagePolygons.forEach((polygon: Polygon) => {
        polygon.tempPolygon = JSON.parse(polygon.polygon);
        polygon._id = this.markup.buildingImagePolygons.length;
      })
      this.redrawCanvas();
    }

    this.captureEvents(canvasEl);
  }

  private captureEvents(canvasEl: HTMLCanvasElement) {
    let obs = fromEvent(canvasEl, 'click');
    obs.subscribe((res: MouseEvent) => {
      const rect = canvasEl.getBoundingClientRect();
      const currentPos = {
        x: res.clientX - rect.left,
        y: res.clientY - rect.top,
      };
      this.drawOnCanvas(currentPos);
    });

    let dblclick = fromEvent(canvasEl, 'dblclick');
    dblclick.subscribe((res: MouseEvent) => {
      res.preventDefault();
      const rect = canvasEl.getBoundingClientRect();
      const currentPos = {
        x: res.clientX - rect.left,
        y: res.clientY - rect.top,
      };
      this.fillPolygon(currentPos);
    });

    let obs1 = fromEvent(canvasEl, 'mousemove');
    obs1.subscribe((res: MouseEvent) => {
      const rect = canvasEl.getBoundingClientRect();
      const currentPos = {
        x: res.clientX - rect.left,
        y: res.clientY - rect.top,
      };
      this.hoverPolygon(currentPos);
    });
  }

  private fillPolygon(currentPos) {
    if (!this.cx) { return; }
    this.markup.buildingImagePolygons.push(this.currentPolygon);
    this.currentPolygon.tempPolygon.push(currentPos);
    if (this.isDrawing) {

      this.cx.fill();
      this.isDrawing = false;
      this.currentPolygon = undefined;
      console.log(this.markup.buildingImagePolygons);
    }

    this.cx.lineTo(currentPos.x, currentPos.y);
    this.cx.stroke();
  };

  private hoverPolygon(currentPos: { x: number, y: number }) {
    if (!this.cx) { return; }

    if (this.markup.buildingImagePolygons) {
      let inRange = false,
        hoveredPolygon = undefined;
      this.markup.buildingImagePolygons.forEach((polygon: Polygon) => {
        let npol = polygon.tempPolygon.length;
        let j = npol - 1;
        let dots = polygon.tempPolygon;
        for (let i = 0; i < npol; i++) {
          if ((((dots[i].y <= currentPos.y) && (currentPos.y < dots[j].y)) || ((dots[j].y <= currentPos.y) && (currentPos.y < dots[i].y))) &&
            (currentPos.x > (dots[j].x - dots[i].x) * (currentPos.y - dots[i].y) / (dots[j].y - dots[i].y) + dots[i].x)) {
            inRange = !inRange;
            hoveredPolygon = polygon;
          }
          j = i;
        };
      });
      if (inRange) {
        this.canvas.nativeElement.style.cursor = 'pointer';
        // console.log(hoveredPolygon);
      } else {
        this.canvas.nativeElement.style.cursor = 'auto';
      }
    }

    // this.polygons.forEach((polygon) => {
    // });
  }

  private removePolygon(index) {
    this.markup.buildingImagePolygons.splice(index, 1);
    this.redrawCanvas();
  }

  private drawOnCanvas(currentPos: { x: number, y: number }) {
    if (!this.cx) { return; }

    this.cx.lineWidth = 1;

    if (!this.isDrawing) {
      this.currentPolygon = new Polygon(
        this.markup.buildingImagePolygons.length + 1,
        this.color.to_rgba(this.colors[this.markup.buildingImagePolygons.length])
      );

      this.currentPolygon.tempPolygon.push(currentPos);
      this.cx.fillStyle = this.currentPolygon.color;

      this.cx.beginPath();
      this.cx.arc(currentPos.x, currentPos.y, 6, 0, 2 * Math.PI);
      this.cx.stroke();
      this.cx.fill();
      this.cx.moveTo(currentPos.x, currentPos.y);
      this.isDrawing = true;
    } else {
      this.currentPolygon.tempPolygon.push(currentPos);
      if (this.mouseInFirstDot(this.currentPolygon.tempPolygon[0], currentPos)) {
        this.cx.fill();
        this.markup.buildingImagePolygons.push(this.currentPolygon);

        this.isDrawing = false;
        this.currentPolygon = undefined;
      }
      this.cx.lineTo(currentPos.x, currentPos.y);
      this.cx.stroke();
    }
  }

  private mouseInFirstDot(polygon: { x: number, y: number }, currentPos: { x: number, y: number }) {
    if (
      (currentPos.x - polygon.x) * (currentPos.x - polygon.x)
      + (currentPos.y - polygon.y) * (currentPos.y - polygon.y)
      <= 30
    ) {
      return true;
    }
    return false;
  }

  private getImageCoordinatesAndSizeOnCanvas(canvas, img) {
    let canvasSize = {
      width: canvas.width,
      height: canvas.height,
    },
      imgSize = {
        width: img.width,
        height: img.height,
      },
      result = {
        width: 0,
        height: 0,
        x: 0,
        y: 0,
      },
      multiplier = 1;

    if (imgSize.width > imgSize.height) {
      multiplier = canvasSize.width / imgSize.width;
    } else {
      multiplier = canvasSize.height / imgSize.height;
    }

    result.width = imgSize.width * multiplier;
    result.height = imgSize.height * multiplier;

    if (result.height > canvasSize.height) {
      multiplier = canvasSize.height / imgSize.height;
    }

    result.width = imgSize.width * multiplier;
    result.height = imgSize.height * multiplier;

    result.x = (canvasSize.width - result.width) / 2;
    result.y = (canvasSize.height - result.height) / 2;

    return result;
  }

  private redrawCanvas() {
    if (!this.cx) { return; }

    this.cx.clearRect(0, 0, 700, 400);

    if (this.markup.buildingImagePolygons.length) {
      this.markup.buildingImagePolygons.forEach((polygon: Polygon, index) => {
        this.cx.fillStyle = this.color.to_rgba(this.colors[index]);
        this.cx.beginPath();
        this.cx.arc(polygon.tempPolygon[0].x, polygon.tempPolygon[0].y, 6, 0, 2 * Math.PI);
        this.cx.stroke();
        this.cx.fill();
        polygon.tempPolygon.forEach((dot, index) => {
          if (!index) { return; }
          this.cx.lineTo(dot.x, dot.y);
          this.cx.stroke();
        })
        this.cx.fill();
      })
    }

  }
}