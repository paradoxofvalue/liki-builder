import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})
export class BuilderComponent implements OnInit {

  stepsList:string[];
  stepIndex: any;

  constructor(private ds: DataService) {
    this.stepsList = ds.steps;
    this.stepIndex = ds.stepIndex;
  }
  
  ngOnInit() {
    this.ds.stepIndex.subscribe(value => this.stepIndex = value);
  }

}
