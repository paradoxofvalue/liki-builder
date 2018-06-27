import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
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

}
