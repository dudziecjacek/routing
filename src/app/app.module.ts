import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CustomerComponent } from './customers/customer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChessComponent } from './chess/chess.component';

@NgModule({
  declarations: [	
    AppComponent,
    CustomerComponent,
      ChessComponent
   ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
