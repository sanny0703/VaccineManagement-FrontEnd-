import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UsersViewService } from '../services/users-view.service';
import { User } from '../model/User';
@Component({
  selector: 'app-view-registered-users',
  templateUrl: './view-registered-users.component.html',
  styleUrls: ['./view-registered-users.component.css'],
})
export class ViewRegisteredUsersComponent implements OnInit {
  data: User[];
  success: boolean = false;
  error_f: boolean = false;
  searchModel = {
    name: '',
  };

  constructor(
    public viewService: UsersViewService,
    public router: Router,
    public authservice: AuthService,
   
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
        this.error_f = false;
      },
      error: (e) => {
        this.error_f = true;
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
            this.error_f = false;
          },
          error: (e) => {
            this.error_f = true;
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
        this.error_f = true;
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
