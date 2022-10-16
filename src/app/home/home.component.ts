import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  quest: string = '';

  constructor(public router: Router, public authservice: AuthService) {}

  ngOnInit(): void {
    // trying to fetch the user if local storage has user
    this.authservice.getUser();
  }
  NavigateSlot() {
    this.router.navigateByUrl('bookSlot');
  }
  NavigateVaccinesList() {
    this.router.navigateByUrl('vaccineList');
  }
  NavigateViewRegistered() {
    this.router.navigateByUrl('view_registered');
  }
  NavigateViewAll() {
    this.router.navigateByUrl('view_all');
  }
  logout() {
    this.authservice.logout();
  }
  refreshPage() {
    this.router.navigateByUrl('home');
  }
  NavigateDailyReport() {
    this.router.navigateByUrl('dailyReport');
  }
  NavigateRegister() {
    this.router.navigateByUrl('signup');
  }
  NavigateSignIn() {
    this.router.navigateByUrl('login');
  }
  onsubmit(my_form: any) {
    this.quest = '';
  }
}
