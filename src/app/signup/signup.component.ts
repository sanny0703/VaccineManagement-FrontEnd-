import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AlertService } from '../services/alert.service';
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
    private notifier: AlertService
  ) {
    this.myUser = new User();
  }

  ngOnInit(): void {}
  OnSubmit(signupform: any) {
    this.authService.signup(this.myUser).subscribe({
      next: (r) => {
        if (r.body == null) {
          // handling Bad Requests
          this.notifier.notifyError('Please use valid Aadhar & Email');
          return;
        }
        this.NewForm(signupform);
        this.notifier.notifySuccess('Registration is Successful, Please LogIn');
      },
      error: (e) => {
        this.notifier.notifyError('Something went wrong');
      },
    });
  }
  private NewForm(signupform: any) {
    signupform.form.markAsPristine();
    this.myUser = new User();
  }
  NavigateSignIn() {
    this.router.navigateByUrl('login');
  }

  NavigateHome() {
    this.router.navigateByUrl('home');
  }

  refreshPage() {
    this.router.navigateByUrl('signup');
  }
}
