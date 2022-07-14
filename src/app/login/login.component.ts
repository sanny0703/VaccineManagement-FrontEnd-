import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  myUser: User;
  invalid: boolean;

  constructor(public router: Router, public authService: AuthService) {
    this.myUser = new User();
    this.invalid = false;
  }

  ngOnInit(): void {}
  OnSubmit(loginform: any) {
    this.authService.getUser(this.myUser.userEmail).subscribe({
      next: (r) => {
        if (r) {
          if (r.userPassword == this.myUser.userPassword) {
            this.authService.currentUser = r;
            loginform.form.markAsPristine();
            this.myUser = new User();
            this.NavigateHome();
          } else {
            this.invalid = true;
          }
        }
      },
      error: (e) => {
        alert('something went wrong');
      },
    });
  }
  NavigateRegister() {
    this.router.navigateByUrl('signup');
  }
  NavigateHome() {
    this.router.navigateByUrl('home');
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
    this.authService.currentUser = new User();
  }
  refreshPage() {
    this.router.navigateByUrl('login');
  }
  NavigateDailyReport() {
    this.router.navigateByUrl('dailyReport');
  }
}
