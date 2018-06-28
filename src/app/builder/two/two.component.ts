import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../data.service';
import { BuildingComplex } from '../one/building-complex';

@Component({
  selector: 'app-two',
  templateUrl: './two.component.html',
  styleUrls: ['./two.component.css']
})
export class TwoComponent implements OnInit {
  buildingComplex: BuildingComplex;
  constructor(private ds: DataService) { }

  ngOnInit() {
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

  addBlock(event) {
    this.buildingComplex.buildingComplex.buildingBlocks.push({
      buildingBlockId: null,
        status: null,
        title: null,
        buildingSections: [
          {
            buildingSectionId: null,
            title: null,
            numberOfFloors: null,
            status: null,
          }
        ],
    })
  }

  addSection(index) {
    this.buildingComplex.buildingComplex.buildingBlocks[index].buildingSections.push({
      buildingSectionId: null,
      title: null,
      numberOfFloors: null,
      status: null,
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
