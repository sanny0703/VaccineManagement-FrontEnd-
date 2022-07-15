import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public myUser: User;
  success: boolean;
  failure: boolean;

  constructor(public router: Router, public authService: AuthService) {
    this.myUser = new User();
    this.failure = false;
    this.success = false;
  }

  ngOnInit(): void {}
  OnSubmit(signupform: any) {
    this.myUser.userName = this.myUser.userName.replace(/\s*/g, '');
    this.authService.addUser(this.myUser).subscribe({
      next: (r) => {
        if (r != null) {
          this.NewForm(signupform)
          this.success = true;
          this.failure = false;
          console.log(r);
        } else {
          this.success = false;
          this.failure = true;
        }
      },
      error: (e) => {
        this.success = false;
        this.failure = true;
        this.NewForm(signupform)

      },
    });
  }
  NewForm(signupform:any){
      signupform.form.markAsPristine()
      this.myUser = new User()
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
