import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DailyReport } from '../model/DailyReport';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class DailyReportService {
  myHeaders = { Authorization: 'b ' };
  constructor(public http: HttpClient, public authService: AuthService) {}
  addReport(
    dailyReport: DailyReport,
    userId: any,
    vaccineId: any,
    companyId: any
  ) {
    this.myHeaders['Authorization'] = 'Bearer ' + this.authService.accessToken;
    return this.http.post<DailyReport>(
      'http://localhost:8888/report/' +
        userId +
        '/' +
        vaccineId +
        '/' +
        companyId,
      dailyReport,
      { headers: this.myHeaders }
    );
  }
  getreports() {
    this.myHeaders['Authorization'] = 'Bearer ' + this.authService.accessToken;
    return this.http.get<DailyReport[]>('http://localhost:8888/report', {
      headers: this.myHeaders,
    });
  }

  searchReportsByDate(date: any) {
    this.myHeaders['Authorization'] = 'Bearer ' + this.authService.accessToken;
    return this.http.get<DailyReport[]>(
      'http://localhost:8888/report/date/' + date,
      { headers: this.myHeaders }
    );
  }

  searchReportsByName(name: any) {
    this.myHeaders['Authorization'] = 'Bearer ' + this.authService.accessToken;
    return this.http.get<DailyReport[]>(
      'http://localhost:8888/report/vaccine/' + name,
      { headers: this.myHeaders }
    );
  }
}
