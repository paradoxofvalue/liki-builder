import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Markup } from '../markup';
import { BuildingComplex } from '../one/building-complex';
import { BuildingBlock } from '../two/building-block';

@Component({
  selector: 'app-three',
  templateUrl: './three.component.html',
  styleUrls: ['./three.component.css']
})
export class ThreeComponent implements OnInit {

  markups: Markup[];
  buildingBlock: BuildingBlock;
  entityType: string = 'BUILDING_COMPLEX';

  newMarkup: boolean = false;

  constructor(private ds: DataService) { }

  ngOnInit() {
    this.ds.get('http://www.likmap.org:8070/add-markup?entityId=45&entityType=BUILDING_COMPLEX')
      .subscribe(result => {
        this.markups = <Markup[]>result;
      });
    this.buildingBlock = {
      buildingComplexId: null,
      buildingBlock: [],
    }
    this.ds.get('http://www.likmap.org:8070/add-complex-two/45')
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
    this.ds.send('http://www.likmap.org:8070/add-markup', this.markups)
    .subscribe(result => {
      this.ds.nextStep();
    });
  }

  prev() {
    this.ds.prevStep();
  }

}
