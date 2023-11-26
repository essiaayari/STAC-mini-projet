
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './app/comp1/home/home.component';
import { AboutusComponent } from './app/comp1/aboutus/aboutus.component';
import { EventsActsComponent } from './app/comp1/events-acts/events-acts.component';
import { ErrorComponent } from './app/comp1/error/error.component';
import { ContactComponent } from './app/comp1/contact/contact.component';
import { MonthlyComponent } from './app/comp1/Event-type/monthly/monthly.component';
import { WeeklyComponent } from './app/comp1/Event-type/weekly/weekly.component';
import { LoginComponent } from './app/comp1/loginplace/login/login.component';
import {  authGuard } from './app/comp1/guards/auth.guard';
import { AdministrateurComponent } from './app/comp1/loginplace/administrateur/administrateur.component';
import { ManageEventsComponent } from './app/comp1/loginplace/manage-events/manage-events.component';
import { ChangepasswordComponent } from './app/comp1/loginplace/changepassword/changepassword.component';
import { ManageMembersComponent } from './app/comp1/loginplace/managemembers/managemembers.component';
import { ManagemonthlyeventsComponent } from './app/comp1/loginplace/managemonthlyevents/managemonthlyevents.component';
import { ManageweeklyeventsComponent } from './app/comp1/loginplace/manageweeklyevents/manageweeklyevents.component';




const routes: Routes = [
  { path: 'home', title: 'home', component: HomeComponent },
  { path: 'aboutus', title: 'about us ', component: AboutusComponent },
  {path: 'eventsandacts',title: 'events and acts',component: EventsActsComponent,
    children: [
      { path: 'monthlyevents', title: 'monthly events', component: MonthlyComponent },
      { path: 'weeklyactivities', title: 'weekly activities', component: WeeklyComponent },
      { path: '', redirectTo: 'monthlyevents', pathMatch: 'full' }
    ]
  },
  { path: 'contact', title: 'contact', component: ContactComponent },
  { path: 'login', title: 'login', component: LoginComponent },
  { path: 'admin', component: AdministrateurComponent, canActivate: [authGuard],
    children: [
      { path: 'manage-members', component: ManageMembersComponent },
      { path: 'manage-events', component: ManageEventsComponent },
      { path: 'managemonthlyevents', component: ManagemonthlyeventsComponent },
      { path: 'manageweeklyevents', component: ManageweeklyeventsComponent },
      { path: 'change-password', component:ChangepasswordComponent },
      { path: '', redirectTo: 'admin', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', title: 'error', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
