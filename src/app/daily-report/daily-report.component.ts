import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { DailyReport } from '../model/DailyReport';
import { User } from '../model/User';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { DailyReportService } from '../services/daily-report.service';

@Component({
  selector: 'app-daily-report',
  templateUrl: './daily-report.component.html',
  styleUrls: ['./daily-report.component.css'],
})
export class DailyReportComponent implements OnInit {
  data: DailyReport[];
  searchModel: any;
  constructor(
    private router: Router,
    public authService: AuthService,
    private dailyReportService: DailyReportService,
    private notifier: AlertService
  ) {
    this.data = new Array<DailyReport>();
    this.searchModel = {
      date: undefined,
      name: '',
    };
  }

  ngOnInit(): void {
    this.authService.getUser();
    if (this.authService.currentUser.userName === '') {
      this.router.navigateByUrl('home');
    } else {
      this.Show();
    }
  }
  refreshPage() {
    this.ngOnInit();
  }
  Show() {
    this.dailyReportService.getreports().subscribe({
      next: (res) => {
        this.data = res;
      },
      error: (e) => {
        this.notifier.notifyError('Something went wrong,Please try again');
      },
    });
  }

  SearchByDate() {
    this.dailyReportService
      .searchReportsByDate(this.searchModel.date)
      .subscribe({
        next: (res) => {
          this.data = res;
        },
        error: (e) => {
          this.notifier.notifyError('Something went wrong,Please try again');
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
          },
          error: (e) => {
            this.notifier.notifyError('Something went wrong,Please try again');
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
    this.authService.logout();
  }
  NavigateHome() {
    this.router.navigateByUrl('home');
  }
}
