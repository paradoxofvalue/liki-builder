import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Markup } from '../markup';
import { Observable, of, fromEvent } from 'rxjs';
import { switchMap, subscribeOn, takeUntil, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-canvas-drawer',
  templateUrl: './canvas-drawer.component.html',
  styleUrls: ['./canvas-drawer.component.css']
})
export class CanvasDrawerComponent implements AfterViewInit {

  @ViewChild('canvas') public canvas: ElementRef;

  @Input() markup: Markup;

  private cx: CanvasRenderingContext2D;
  public img;
  
  constructor () {
    
  }
  
  ngOnInit() {
    this.img = new Image();
    this.img.src = this.markup.link;
  }

  ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    this.cx.lineWidth = 1;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';

    
    this.img.onload = () => {
      let icasoc = this.getImageCoordinatesAndSizeOnCanvas(canvasEl, this.img);
      this.cx.drawImage(this.img, icasoc.x, icasoc.y, icasoc.width, icasoc.height);
    }

    this.captureEvents(canvasEl);
  }

  private captureEvents(canvasEl: HTMLCanvasElement) {

    let obs = fromEvent(canvasEl, 'mousedown')
      .pipe(
        switchMap((e) => {
          return fromEvent(canvasEl, 'mousemove')
            .pipe(
              takeUntil(fromEvent(canvasEl, 'mouseup')),
              takeUntil(fromEvent(canvasEl, 'mouseleave')),
              pairwise()
            );
        })
      );
      obs.subscribe((res: [MouseEvent, MouseEvent]) => {
        const rect = canvasEl.getBoundingClientRect();

        const prevPos = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top,
        };

        const currentPos = {
          x: res[1].clientX - rect.left,
          y: res[1].clientY - rect.top,
        };

        this.drawOnCanvas(prevPos, currentPos);
      });

    
  }

  private drawOnCanvas(prevPos: { x: number, y: number }, currentPos: { x: number, y: number }) {
    if (!this.cx) { return; }

    this.cx.beginPath();

    if (prevPos) {
      this.cx.moveTo(prevPos.x, prevPos.y);
      this.cx.lineTo(currentPos.x, currentPos.y);
      this.cx.stroke();
    }
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
}