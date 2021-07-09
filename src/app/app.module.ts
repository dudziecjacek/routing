import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NameEditorComponent } from './hero-form-reactive/name-editor.component';
import { HeroFormReactiveValidationComponent } from './hero-form-reactive-validation/hero-form-reactive-validation.component';


@NgModule({
  declarations: [
    AppComponent,
    NameEditorComponent,
    HeroFormReactiveValidationComponent
  ],
  exports: [
    NameEditorComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
