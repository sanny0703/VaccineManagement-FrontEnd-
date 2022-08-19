import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from '../model/User';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public myUser: User;

  constructor(
    public router: Router,
    public authService: AuthService,
    private toast: NgToastService
  ) {
    this.myUser = new User();
  }

  ngOnInit(): void {}
  OnSubmit(signupform: any) {
    this.myUser.userName = this.myUser.userName.replace(/\s*/g, ''); // removing spaces
    this.authService.signup(this.myUser).subscribe({
      next: (r) => {
        this.NewForm(signupform);
        this.toast.success({
          detail: 'Success',
          summary: 'Registration is Successful, Please LogIn',
          duration: 6000,
        });
      },
      error: (e) => {
        this.toast.error({
          detail: 'Something went wrong',
          summary: 'Use valid email & Aadhar',
          duration: 6000,
        });
      },
    });
  }
  NewForm(signupform: any) {
    signupform.form.markAsPristine();
    this.myUser = new User();
  }
  NavigateSignIn() {
    this.router.navigateByUrl('login');
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

  refreshPage() {
    this.router.navigateByUrl('signup');
  }
  NavigateDailyReport() {
    this.router.navigateByUrl('dailyReport');
  }
}
