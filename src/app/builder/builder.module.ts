import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from './data.service';
import { OneComponent } from './one/one.component';
import { HttpClientModule } from '@angular/common/http';
import { TwoComponent } from './two/two.component';
import { ProgressComponent } from './progress/progress.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule, MatSelectModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { PhotosUploaderComponent } from './photos-uploader/photos-uploader.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ThreeComponent } from './three/three.component';
import { CanvasDrawerComponent } from './canvas-drawer/canvas-drawer.component';
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSelectModule,
    AngularEditorModule
  ],
  exports: [
    OneComponent,
    TwoComponent,
    ProgressComponent,
    PhotosUploaderComponent,
    ThreeComponent,
    CanvasDrawerComponent, 
  ],
  declarations: [
    OneComponent,
    TwoComponent,
    ProgressComponent,
    PhotosUploaderComponent,
    ThreeComponent,
    CanvasDrawerComponent, 
  ],
  providers: [
    DataService,
  ],
})
export class BuilderModule { }
