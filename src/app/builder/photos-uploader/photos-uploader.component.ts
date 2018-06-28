import { Component, OnInit, Input } from '@angular/core';
import { Photo } from './photo';
import { FormControl } from '@angular/forms';

import { MatMomentDateModule } from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD.MM.YYYY',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-photos-uploader',
  templateUrl: './photos-uploader.component.html',
  styleUrls: ['./photos-uploader.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class PhotosUploaderComponent implements OnInit {

  @Input() images: Photo[];
  @Input() builderComplexId: any;
  maxDate = new Date();

  constructor() { }

  ngOnInit() {
  }

  photoUpload(event) {
    let files = event.target.files;
    let self = this;
    for (let i = 0, f; f = files[i]; i++) {
      if (!f.type.match('image.*')) {
        continue;
      }
      let reader = new FileReader();
      reader.onload = (function (theFile) {
        return function (e) {
          debugger;
          self.images.push({
            base64Image: e.target.result,
            buildingImageId: null,
            buildingImagePolygons: null,
            date: new Date(),
            entityId: self.builderComplexId,
            entityType: 'BUILDING_HISTORY_COMPLEX',
            link: null,
            status: 'ACTIVE',
          })
        };
      })(f);
      reader.readAsDataURL(f);
    }

  }

}