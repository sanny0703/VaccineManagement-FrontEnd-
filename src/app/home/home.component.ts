import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  quest: string = '';

  constructor(public router: Router, public authservice: AuthService) {}

  ngOnInit(): void {}
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
    this.authservice.currentUser = new User();
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
