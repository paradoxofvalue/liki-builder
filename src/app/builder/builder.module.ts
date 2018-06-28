import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from './data.service';
import { OneComponent } from './one/one.component';
import { HttpClientModule } from '@angular/common/http';
import { TwoComponent } from './two/two.component';
import { ProgressComponent } from './progress/progress.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { PhotosUploaderComponent } from './photos-uploader/photos-uploader.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    AngularEditorModule
  ],
  exports: [
    OneComponent,
    TwoComponent,
    ProgressComponent,
    PhotosUploaderComponent,

  ],
  declarations: [
    OneComponent,
    TwoComponent,
    ProgressComponent,
    PhotosUploaderComponent, 
  ],
  providers: [
    DataService
  ],
})
export class BuilderModule { }
