import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthenticationRequest } from '../model/AuthenticationRequest';
import { User } from '../model/User';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  request: AuthenticationRequest;
  errorMessage: string;

  constructor(
    public router: Router,
    public authService: AuthService,
    private toast: NgToastService
  ) {
    this.request = new AuthenticationRequest();
    this.errorMessage = '';
  }

  ngOnInit(): void {}
  OnSubmit(loginform: any) {
    this.authService.login(this.request).subscribe({
      next: (res) => {
        this.authService.accessToken = res.jwt;
        this.authService.currentUser.userId = res.id;
        this.toast.success({
          detail: 'Success',
          summary: 'You are logged in successfully',
          duration: 5000,
        });
        loginform.form.markAsPristine();
        this.request = new AuthenticationRequest();
        this.setCurrentUser();
        this.NavigateHome();
      },
      error: (e) => {
        loginform.form.setErrors({ invalid: true });
        this.toast.error({
          detail: '!Oops',
          summary: 'Email or password does not match',
          duration: 5000,
        });
      },
    });
  }
  setCurrentUser() {
    this.authService.getUser().subscribe({
      next: (res) => {
        if (res && res.userEmail !== '') {
          this.authService.currentUser = res;
        }
      },
      error: (e) => {
        this.toast.error({
          detail: '! SetUser Oops',
          summary: 'Something went wrong, Please try Again',
          duration: 5000,
        });
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
  ngOnDestroy(): void {}
}
