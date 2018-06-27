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

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  exports: [
    OneComponent,
    TwoComponent,
    ProgressComponent,
  ],
  declarations: [OneComponent, TwoComponent, ProgressComponent],
  providers: [
    DataService
  ],
})
export class BuilderModule { }
