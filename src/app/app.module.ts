import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './app/comp1/menu/menu.component';
import { HomeComponent } from './app/comp1/home/home.component';
import { EventsActsComponent } from './app/comp1/events-acts/events-acts.component';
import { ErrorComponent } from './app/comp1/error/error.component';
import { ContactComponent } from './app/comp1/contact/contact.component';
import { AboutusComponent } from './app/comp1/aboutus/aboutus.component';
import { HttpClientModule } from '@angular/common/http';
import { WeeklyComponent } from './app/comp1/Event-type/weekly/weekly.component';
import { MonthlyComponent } from './app/comp1/Event-type/monthly/monthly.component';
import { LoginComponent } from './app/comp1/loginplace/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdministrateurComponent } from './app/comp1/loginplace/administrateur/administrateur.component';
import { ManageEventsComponent } from './app/comp1/loginplace/manage-events/manage-events.component';
import { ChangepasswordComponent } from './app/comp1/loginplace/changepassword/changepassword.component';
import { ManageMembersComponent } from './app/comp1/loginplace/managemembers/managemembers.component';
import { FooterComponent } from './app/comp1/footer/footer.component';
import { PubComponent } from './app/comp1/api/pub/pub.component';
import { ManageweeklyeventsComponent } from './app/comp1/loginplace/manageweeklyevents/manageweeklyevents.component';
import { ManagemonthlyeventsComponent } from './app/comp1/loginplace/managemonthlyevents/managemonthlyevents.component';
import { Pipe1Pipe } from './pipe1.pipe';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AboutusComponent,
    HomeComponent,
    EventsActsComponent,
    ErrorComponent,
    ContactComponent,
    WeeklyComponent,
    MonthlyComponent,
    LoginComponent,
    AdministrateurComponent,
    ManageMembersComponent,
    ManageEventsComponent,
    ChangepasswordComponent,
    FooterComponent,
    PubComponent,
    ManageweeklyeventsComponent,
    ManagemonthlyeventsComponent,
    Pipe1Pipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
