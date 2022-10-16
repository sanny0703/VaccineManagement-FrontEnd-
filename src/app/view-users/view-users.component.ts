import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { Vaccine } from '../model/vaccine';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { UsersViewService } from '../services/users-view.service';
@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css'],
})
export class ViewUsersComponent implements OnInit {
  data: Vaccine[];
  searchModel = {
    name: '',
  };

  constructor(
    public viewService: UsersViewService,
    public router: Router,
    public authService: AuthService,
    private notifier: AlertService
  ) {
    this.data = new Array<Vaccine>();
  }

  ngOnInit(): void {
    this.authService.getUser();
    this.Show();
  }
  Show() {
    this.viewService.getVaccinesAdministered().subscribe({
      next: (res) => {
        this.data = res;
      },
      error: (e) => {
        this.notifier.notifyError('Something went wrong');
      },
    });
  }
  SearchByName() {
    if (this.searchModel.name === '') {
      this.Show();
    } else {
      this.viewService
        .searchVaccinesByPatientName(this.searchModel.name)
        .subscribe({
          next: (res) => {
            this.data = res;
          },
          error: (e) => {
            this.notifier.notifyError('Something went wrong');
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
    this.authService.logout()
  }
}
