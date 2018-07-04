import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Markup } from '../markup';
import { BuildingComplex } from '../one/building-complex';
import { BuildingBlock } from '../two/building-block';
import { Polygon } from '../canvas-drawer/polygon';

@Component({
  selector: 'app-three',
  templateUrl: './three.component.html',
  styleUrls: ['./three.component.scss']
})
export class ThreeComponent implements OnInit {

  markups: Markup[];
  buildingBlock: BuildingBlock;
  entityType: string = 'BUILDING_COMPLEX';

  newMarkup: boolean = false;

  constructor(private ds: DataService) { }

  ngOnInit() {
    this.ds.get('/add-markup?entityId=45&entityType=BUILDING_COMPLEX')
      .subscribe(result => {
        this.markups = <Markup[]>result;
      });
    this.buildingBlock = {
      buildingComplexId: null,
      buildingBlock: [],
    }
    this.ds.get('/add-complex-two/45')
      .subscribe(result => {
        this.buildingBlock = <BuildingBlock>result;
      })
  }

  markupAdded(added: boolean) {
    this.newMarkup = !added;
  }

  addNewMarkup() {
    this.newMarkup = true;
  }

  next() {
    this.markups.forEach(canvas => {
      canvas.buildingImagePolygons.forEach(polygon => {
        polygon.polygon = JSON.stringify(polygon.tempPolygon);
      })
    });
    this.ds.send('/add-markup', this.markups)
    .subscribe(result => {
      this.ds.nextStep();
    });
  }

  prev() {
    this.ds.prevStep();
  }

}
