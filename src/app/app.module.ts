import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {HomeComponent} from './Pages/home/home.component';
import {NotFoundComponent} from './Pages/not-found/not-found.component';
import {DashboardComponent} from './Pages/dashboard/dashboard.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HeaderComponent } from './Shared/header/header.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    DashboardComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    MatSnackBarModule,
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
