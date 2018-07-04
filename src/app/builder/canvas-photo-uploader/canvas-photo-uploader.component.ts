import { Component, OnInit, Input, OnChanges, SimpleChange, Output, EventEmitter } from '@angular/core';
import { Markup } from '../canvas-drawer/markup';

@Component({
  selector: 'app-canvas-photo-uploader',
  templateUrl: './canvas-photo-uploader.component.html',
  styleUrls: ['./canvas-photo-uploader.component.scss']
})
export class CanvasPhotoUploaderComponent implements OnInit {

  @Input() markups: Markup[];
  @Output() markupAdded = new EventEmitter<boolean>();
  @Input() builderComplexId: any;
  @Input() entityType: string;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChange) {
    // debugger;
  }

  photoUpload(event) {
    this.markupAdded.emit(true);
    let files = event.target.files;
    let self = this;
    for (let i = 0, f; f = files[i]; i++) {
      if (!f.type.match('image.*')) {
        continue;
      }
      let reader = new FileReader();
      reader.onload = (function (theFile) {
        return function (e) {
          self.markups.push({
            base64Image: e.target.result,
            buildingImageId: null,
            buildingImagePolygons: [],
            date: null,
            entityId: self.builderComplexId,
            entityType: self.entityType,
            link: null,
            status: 'ACTIVE',
          })
        };
      })(f);
      reader.readAsDataURL(f);
    }
    
  }

}
