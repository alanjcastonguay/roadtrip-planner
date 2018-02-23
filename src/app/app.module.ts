import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';

import { MapContentComponent } from './map-content.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    MapContentComponent
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    MatExpansionModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    MatCardModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      libraries: ['drawing', 'places'],
      apiKey: 'AIzaSyBzcEQj2HNdmDI2-sBYLONvTGsdd3pIGys'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
