import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DailyReport } from '../model/DailyReport';
import { User } from '../model/User';
import { AuthService } from '../services/auth.service';
import { DailyReportService } from '../services/daily-report.service';

@Component({
  selector: 'app-daily-report',
  templateUrl: './daily-report.component.html',
  styleUrls: ['./daily-report.component.css'],
})
export class DailyReportComponent implements OnInit {
  data: DailyReport[];
  error_f: boolean;
  searchModel: any;
  constructor(
    private router: Router,
    public authService: AuthService,
    private dailyReportService: DailyReportService
  ) {
    this.data = new Array<DailyReport>();
    this.error_f = false;
    this.searchModel = {
      date: undefined,
      name: '',
    };
    console.warn(this.searchModel.date);
  }

  ngOnInit(): void {
    this.Show();
  }
  refreshPage() {
    this.ngOnInit();
  }
  Show() {
    this.dailyReportService.getreports().subscribe({
      next: (res) => {
        this.data = res;
        this.error_f = false;
      },
      error: (e) => {
        this.error_f = true;
      },
    });
  }

  SearchByDate() {
    this.dailyReportService
      .searchReportsByDate(this.searchModel.date)
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
  SearchByName() {
    if (this.searchModel.name === '') {
      this.Show();
    } else {
      this.dailyReportService
        .searchReportsByName(this.searchModel.name)
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
  NavigateHome() {
    this.router.navigateByUrl('home');
  }
}
