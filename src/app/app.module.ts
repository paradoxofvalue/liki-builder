import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BuilderComponent } from './builder/builder.component';
import { BuilderModule } from './builder/builder.module';

@NgModule({
  declarations: [
    AppComponent,
    BuilderComponent
  ],
  imports: [
    BrowserModule,
    BuilderModule
  ],
  exports: [
    BuilderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
