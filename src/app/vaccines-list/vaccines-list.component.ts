import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { VaccineCompany } from '../model/VaccineCompany';
import { AuthService } from '../services/auth.service';
import { UsersViewService } from '../services/users-view.service';
import { VaccineListService } from '../services/vaccine-list.service';

@Component({
  selector: 'app-vaccines-list',
  templateUrl: './vaccines-list.component.html',
  styleUrls: ['./vaccines-list.component.css'],
})
export class VaccinesListComponent implements OnInit {
  vaccineCompanies: VaccineCompany[];
  error_f: boolean = false;
  searchModel: any;
  constructor(
    public viewService: UsersViewService,
    public router: Router,
    public authService: AuthService,
    public vaccineListService: VaccineListService
  ) {
    this.vaccineCompanies = new Array<VaccineCompany>();
    this.searchModel = { name: '' };
  }

  ngOnInit(): void {
    this.Show();
  }
  refreshPage() {
    this.router.navigateByUrl('vaccineList');
  }
  Show() {
    this.vaccineListService.getAllVaccines().subscribe({
      next: (res) => {
        this.vaccineCompanies = res;
        this.error_f = false;
      },
      error: (e) => {
        this.error_f = true;
      },
    });
  }

  Search() {
    this.vaccineListService.searchVaccines(this.searchModel.name).subscribe({
      next: (res) => {
        this.vaccineCompanies = res;
        console.log(res);
        this.error_f = false;
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
  NavigateViewRegistered() {
    this.router.navigateByUrl('view_registered');
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
    this.authService.currentUser = new User();
  }
}
