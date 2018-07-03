import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Markup } from '../markup';
import { BuildingBlock } from '../two/building-block';

@Component({
  selector: 'app-four',
  templateUrl: './four.component.html',
  styleUrls: ['./four.component.css']
})
export class FourComponent implements OnInit {

  markups: Markup[] = [];
  buildingBlock: BuildingBlock;
  entityType: string = 'BUILDING_BLOCK';
  newMarkup: boolean = false;

  constructor(private ds: DataService) { }

  ngOnInit() {
    this.buildingBlock = {
      buildingComplexId: null,
      buildingBlock: [],
    }
    this.ds.get('http://www.likmap.org:8080/add-complex-two/45')
      .subscribe(result => {
        this.buildingBlock = <BuildingBlock>result;
        let tempId = [];
        this.buildingBlock.buildingBlock.forEach((block) => {
          tempId.push(block.buildingBlockId);
        })
        this.ds.get('http://www.likmap.org:8080/add-markup?entityId=' + tempId.join(',') + '&entityType='+this.entityType)
          .subscribe(result => {
            for (const key in result) {
              if (result.hasOwnProperty(key)) {
                const element = result[key];
                this.markups.push(element);
              }
            }
          })
      });
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
