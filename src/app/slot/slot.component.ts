import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { DailyReport } from '../model/DailyReport';
import { User } from '../model/User';
import { Vaccine } from '../model/vaccine';
import { VaccineCompany } from '../model/VaccineCompany';
import { AuthService } from '../services/auth.service';
import { DailyReportService } from '../services/daily-report.service';
import { SlotServiceService } from '../services/slot-service.service';
import { VaccineListService } from '../services/vaccine-list.service';

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.css'],
})
export class SlotComponent implements OnInit {
  vaccines_index: number = 0;

  userId?: number;
  vaccineId?: number;
  companyId?: number;

  data: Vaccine;
  doseValue: string = '';
  vaccines: VaccineCompany[];
  success: boolean;
  error_f: boolean;
  my_date?: Date = undefined;
  my_date2?: Date = undefined;
  min_date: Date = new Date();
  report: DailyReport = new DailyReport();

  constructor(
    public dailyReportService: DailyReportService,
    public router: Router,
    public vaccinesService: VaccineListService,
    public slotService: SlotServiceService,
    public authService: AuthService
  ) {
    this.data = new Vaccine();
    this.vaccines = new Array<VaccineCompany>();
    this.success = false;
    this.error_f = false;
  }

  ngOnInit(): void {
    this.vaccinesService.getAllVaccines().subscribe({
      next: (res) => {
        this.vaccines = res;
      },
    });
  }

  Submit(bookSlotForm: any) {
    this.data.patientName = this.data.patientName.replace(/\s*/g, '');
    this.userId = this.authService.currentUser.userId;
    this.companyId = this.vaccines[this.vaccines_index].company.companyId;
    this.report.vaccineName = this.vaccines[this.vaccines_index].vaccineName;
    this.report.reportTime = formatDate(
      new Date(),
      'HH:mm:ss',
      'en-US',
      '+0530'
    );
    if (this.doseValue === 'first') {
      this.data.vaccineDate1 = this.my_date;
      this.slotService
        .addVaccine(
          this.data,
          this.userId,
          this.vaccines[this.vaccines_index].vaccineCompanyId
        )
        .subscribe({
          next: (res) => {
            this.vaccineId = res.vaccineId;
            this.report.reportDate = res.vaccineDate1;
            this.report.reportStatus = 'C';
            this.dailyReportService
              .addReport(
                this.report,
                this.userId,
                this.vaccineId,
                this.companyId
              )
              .subscribe({
                next: (res) => {
                  this.success = true;
                  this.error_f = false;
                },
                error: (e) => {
                  this.error_f = true;
                  this.success = false;
                },
              });
            this.data = new Vaccine();
            this.my_date = undefined;
            bookSlotForm.form.markAsPristine();
          },
        });
    } else {
      this.data.vaccineDate2 = this.my_date;
      this.data.vaccineDate1 = this.my_date2;
      this.slotService
        .addVaccine(
          this.data,
          this.userId,
          this.vaccines[this.vaccines_index].vaccineCompanyId
        )
        .subscribe({
          next: (res) => {
            this.vaccineId = res.vaccineId;
            this.report.reportDate = res.vaccineDate2;
            this.report.reportStatus = 'C';
            this.dailyReportService
              .addReport(
                this.report,
                this.userId,
                this.vaccineId,
                this.companyId
              )
              .subscribe({
                next: (res) => {
                  this.success = true;
                  this.error_f = false;
                },
                error: (e) => {
                  this.error_f = true;
                  this.success = false;
                },
              });
            this.data = new Vaccine();
            this.my_date = undefined;
            bookSlotForm.form.markAsPristine();
          },
        });
    }
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

  refreshPage() {
    this.router.navigateByUrl('bookSlot');
  }
  NavigateDailyReport() {
    this.router.navigateByUrl('dailyReport');
  }
  logout() {
    this.authService.currentUser = new User();
  }
}
