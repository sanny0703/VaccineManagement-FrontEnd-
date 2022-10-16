import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUtils } from '../model/AppUtils';
import { AuthenticationRequest } from '../model/AuthenticationRequest';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { LocalStoreService } from '../services/local-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  request: AuthenticationRequest;

  constructor(
    public router: Router,
    public authService: AuthService,
    private notifier: AlertService,
    private localStore: LocalStoreService
  ) {
    this.request = new AuthenticationRequest();
  }

  ngOnInit(): void {this.authService.logout()}
  OnSubmit(loginform: any) {
    this.authService.login(this.request).subscribe({
      next: (res) => {
        if (res.body == null) {
          // handling un authorized requests
          this.notifier.notifyError("Password or Email doesn't match");
          return;
        }
        this.authService.currentUser.userId = res.body.id;
        this.authService.accessToken = res.body.jwt;
        this.notifier.notifySuccess('You are logged in successfully');
        // stroing the login info to local Storage(encrypted:))
        this.localStore.storeData(AppUtils.TOKEN, res.body.jwt);
        loginform.form.markAsPristine();
        this.request = new AuthenticationRequest();
        this.NavigateHome();
      },
      error: (e) => {
        loginform.form.setErrors({ invalid: true });
        this.notifier.notifyError('Something went wrong');
      },
    });
  }
  NavigateRegister() {
    this.router.navigateByUrl('signup');
  }
  NavigateHome() {
    this.router.navigateByUrl('home');
  }
  logout() {
    this.authService.logout();
  }
  refreshPage() {
    this.router.navigateByUrl('login');
  }

  ngOnDestroy(): void {}
}
