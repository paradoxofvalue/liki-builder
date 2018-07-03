import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../data.service';
import { BuildingBlock } from './building-block';

@Component({
  selector: 'app-two',
  templateUrl: './two.component.html',
  styleUrls: ['./two.component.css']
})
export class TwoComponent implements OnInit {
  buildingStructure: BuildingBlock;
  constructor(private ds: DataService) { }

  ngOnInit() {
    this.buildingStructure = {
      buildingComplexId: null,
      buildingBlock: [
        {
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
        }
      ],

    }
    this.ds.get('http://www.likmap.org:8070/add-complex-two/45')
      .subscribe(result => {
        this.buildingStructure = <BuildingBlock>result;
      })
  }

  addBlock() {
    this.buildingStructure.buildingBlock.push({
      buildingBlockId: null,
      status: "ACTIVE",
      title: null,
      buildingSections: [
        {
          buildingSectionId: null,
          title: null,
          numberOfFloors: null,
          status: "ACTIVE",
        }
      ],
    })
  }

  addSection(index) {
    this.buildingStructure.buildingBlock[index].buildingSections.push({
      buildingSectionId: null,
      title: null,
      numberOfFloors: null,
      status: "ACTIVE",
    })
  }

  removeBlock(index) {
    if (this.buildingStructure.buildingBlock[index].buildingBlockId) {
      this.buildingStructure.buildingBlock[index].status = "TRASH";
      this.buildingStructure.buildingBlock[index].buildingSections.forEach((section, sIndex) => {
        if (section.buildingSectionId) {
          section.status = "TRASH";
        } else {
          this.buildingStructure.buildingBlock[index].buildingSections.splice(sIndex, 1)
        }
      });
    } else {
      this.buildingStructure.buildingBlock.splice(index, 1);
    }
  }

  removeSection(blockIndex, sectionIndex) {
    if (this.buildingStructure.buildingBlock[blockIndex].buildingSections[sectionIndex].buildingSectionId) {
      this.buildingStructure.buildingBlock[blockIndex].buildingSections[sectionIndex].status = "TRASH";
    } else {
      this.buildingStructure.buildingBlock[blockIndex].buildingSections.splice(sectionIndex, 1);
    }
  }

  next() {
    this.ds.send('http://www.likmap.org:8070/add-complex-two', this.buildingStructure)
      .subscribe(result => {
        this.ds.nextStep();
      });
  }

  prev() {
    this.ds.prevStep();
  }

}
