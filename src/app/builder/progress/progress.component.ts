import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {
  
  stepsList:string[];
  stepIndex: any;

  constructor(private ds: DataService) {
    this.stepsList = ds.steps;
    this.stepIndex = ds.stepIndex;
  }
  ngOnInit() {
    this.ds.stepIndex.subscribe(value => this.stepIndex = value);
  }

  activeStep(i) {
    if (i <= this.stepIndex) {
      return {'color': '#6485d8'};
    }
  }

  activeStepBorder(i) {
    if (i <= this.stepIndex) {
      return {'border-color': '#6485d8'};
    }
  }
  

}
