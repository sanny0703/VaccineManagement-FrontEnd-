import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { SlotComponent } from './slot/slot.component';
import { ViewRegisteredUsersComponent } from './view-registered-users/view-registered-users.component';
import { VaccinesListComponent } from './vaccines-list/vaccines-list.component';
import { DailyReportComponent } from './daily-report/daily-report.component';
import { NgToastModule } from 'ng-angular-popup';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ViewUsersComponent,
    SlotComponent,
    ViewRegisteredUsersComponent,
    VaccinesListComponent,
    DailyReportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgToastModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
