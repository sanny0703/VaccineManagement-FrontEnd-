import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { Vaccine } from '../model/vaccine';
import { AuthService } from '../services/auth.service';
import { UsersViewService } from '../services/users-view.service';
@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css'],
})
export class ViewUsersComponent implements OnInit {
  data: Vaccine[];
  success: boolean = false;
  error_f: boolean = false;
  searchModel = {
    name: '',
  };

  constructor(
    public viewService: UsersViewService,
    public router: Router,
    public authService: AuthService
  ) {
    this.data = new Array<Vaccine>();
  }

  ngOnInit(): void {
    this.Show();
  }
  Show() {
    this.viewService.getPatients().subscribe({
      next: (res) => {
        this.data = res;
        this.error_f = false;
      },
      error: (e) => {
        this.error_f = true;
      },
    });
  }
  SearchByName() {
    if (this.searchModel.name === '') {
      this.Show();
    } else {
      this.viewService.searchPatientsByName(this.searchModel.name).subscribe({
        next: (res) => {
          this.data = res;
          this.error_f = false;
        },
        error: (e) => {
          this.error_f = true;
        },
      });
    }
  }
  refreshPage() {
    this.router.navigateByUrl('view_all');
  }

  NavigateHome() {
    this.router.navigateByUrl('home');
  }

  NavigateVaccinesList() {
    this.router.navigateByUrl('vaccineList');
  }
  NavigateRegistered() {
    this.router.navigateByUrl('view_registered');
  }

  NavigateSlot() {
    this.router.navigateByUrl('bookSlot');
  }
  NavigateDailyReport() {
    this.router.navigateByUrl('dailyReport');
  }
  logout() {
    this.authService.currentUser = new User();
  }
}
