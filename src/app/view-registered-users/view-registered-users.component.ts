import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UsersViewService } from '../services/users-view.service';
import { User } from '../model/User';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-view-registered-users',
  templateUrl: './view-registered-users.component.html',
  styleUrls: ['./view-registered-users.component.css'],
})
export class ViewRegisteredUsersComponent implements OnInit {
  data: User[];
  searchModel = {
    name: '',
  };

  constructor(
    public viewService: UsersViewService,
    public router: Router,
    public authservice: AuthService,
    private toast: NgToastService
  ) {
    this.data = new Array<User>();
  }

  ngOnInit(): void {
    this.Show();
  }
  refreshPage() {
    this.router.navigateByUrl('view_registered');
  }
  Show() {
    this.viewService.getRegisteredUsers().subscribe({
      next: (res) => {
        this.data = res;
      },
      error: (e) => {
        this.toast.error({
          detail: '!!Oops',
          summary: 'Something went wrong',
          duration: 6000,
        });
      },
    });
  }
  Search() {
    if (this.searchModel.name === '') {
      this.Show();
    } else {
      this.viewService
        .searchRegisteredUsersByName(this.searchModel.name)
        .subscribe({
          next: (res) => {
            this.data = res;
          },
          error: (e) => {
            this.toast.error({
              detail: '!!Oops',
              summary: 'Something went wrong',
              duration: 6000,
            });
          },
        });
    }
  }
  DeleteUser(id: any) {
    this.viewService.deleterUser(id).subscribe({
      next: (res) => {
        this.Show();
      },
      error: (e) => {
        this.toast.error({
          detail: '!!Oops',
          summary: 'Something went wrong',
          duration: 6000,
        });
      },
    });
  }

  NavigateHome() {
    this.router.navigateByUrl('home');
  }

  NavigateVaccinesList() {
    this.router.navigateByUrl('vaccineList');
  }
  NavigateViewAll() {
    this.router.navigateByUrl('view_all');
  }

  NavigateSlot() {
    this.router.navigateByUrl('bookSlot');
  }
  NavigateDailyReport() {
    this.router.navigateByUrl('dailyReport');
  }
  logout() {
    this.authservice.currentUser = new User();
  }
}
