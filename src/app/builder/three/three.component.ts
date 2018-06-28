import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Markup } from '../markup';

@Component({
  selector: 'app-three',
  templateUrl: './three.component.html',
  styleUrls: ['./three.component.css']
})
export class ThreeComponent implements OnInit {

  markups: Markup[];

  constructor(private ds: DataService) { }

  ngOnInit() {
    this.ds.get('http://www.likmap.org:8080/add-markup?entityId=45&entityType=BUILDING_COMPLEX')
      .subscribe(result => {
        this.markups = <Markup[]>result;
      })
  }

  next() {
    // this.ds.send('http://www.likmap.org:8080/add-complex-one', this.buildingComplex)
    // .subscribe(result => {
    // });

    this.ds.nextStep();
  }

  prev() {
    this.ds.prevStep();
  }

}
