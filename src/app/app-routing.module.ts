import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component'
import {ViewUsersComponent} from './view-users/view-users.component'
import {ViewRegisteredUsersComponent} from './view-registered-users/view-registered-users.component'
import {SlotComponent} from './slot/slot.component'
import {VaccinesListComponent} from './vaccines-list/vaccines-list.component';
import {DailyReportComponent} from './daily-report/daily-report.component'
const routes: Routes = [ { path: '', redirectTo: 'home', pathMatch: 'full' },  {
  path:"home",
  component:HomeComponent
},
{
  path:"login",
  component:LoginComponent
},
{
  path:"signup",
  component:SignupComponent
},
{
  path:"view_all",
  component:ViewUsersComponent
},
{
  path:"view_registered",
  component:ViewRegisteredUsersComponent
},
{
  path:"bookSlot",
  component:SlotComponent
},
{
  path:"vaccineList",
  component: VaccinesListComponent
},
{
  path:"dailyReport",
  component:DailyReportComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
