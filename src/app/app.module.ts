import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
