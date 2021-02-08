import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientModule } from './client/client.module';
import { JwtModule } from '@auth0/angular-jwt';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClientModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JwtModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
