import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Markup } from '../markup';
import { BuildingComplex } from '../one/building-complex';

@Component({
  selector: 'app-three',
  templateUrl: './three.component.html',
  styleUrls: ['./three.component.css']
})
export class ThreeComponent implements OnInit {

  markups: Markup[];
  buildingComplex: BuildingComplex;
  constructor(private ds: DataService) { }

  ngOnInit() {
    this.ds.get('http://www.likmap.org:8080/add-markup?entityId=45&entityType=BUILDING_COMPLEX')
      .subscribe(result => {
        this.markups = <Markup[]>result;
      });
    this.buildingComplex = {
      administrativeAreaLevel1: '',
      administrativeAreaLevel2: null,
      administrativeAreaLevel3: null,
      country: null,
      lat: null,
      lng: null,
      locality: null,
      route: null,
      streetNumber: null,
      sublocalityLevel1: null,
      buildingComplex: {
        buildingComplexId: null,
        buildingBlocks: [],
        address: null,
        constructionEnd: null,
        constructionStart: null,
        description: null,
        maxPrice: {
          currency: null,
          price: null,
        },
        price: {
          currency: null,
          price: null,
        },
        status: null,
        title: null,
        video: null,
      },
      images: [],

    }
    this.ds.get('http://www.likmap.org:8080/add-complex-one/45')
      .subscribe(result => {
        this.buildingComplex = <BuildingComplex>result;
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
