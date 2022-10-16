import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppUtils } from '../model/AppUtils';
import { DailyReport } from '../model/DailyReport';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class DailyReportService {
  constructor(public http: HttpClient, public authService: AuthService) {}
  addReport(
    dailyReport: DailyReport,
    userId: any,
    vaccineId: any,
    companyId: any
  ) {
    return this.http.post<DailyReport>(
      AppUtils.API_ENDPOINT +
        '/report/' +
        userId +
        '/' +
        vaccineId +
        '/' +
        companyId,
      dailyReport,
      { headers: { Authorization: 'Bearer ' + this.authService.accessToken } }
    );
  }
  getreports() {
    return this.http.get<DailyReport[]>(AppUtils.API_ENDPOINT + '/report', {
      headers: { Authorization: 'Bearer ' + this.authService.accessToken },
    });
  }

  searchReportsByDate(date: any) {
    return this.http.get<DailyReport[]>(
      AppUtils.API_ENDPOINT + '/report/date/' + date,
      { headers: { Authorization: 'Bearer ' + this.authService.accessToken } }
    );
  }

  searchReportsByName(name: any) {
    return this.http.get<DailyReport[]>(
      AppUtils.API_ENDPOINT + '/report/vaccine/' + name,
      { headers: { Authorization: 'Bearer ' + this.authService.accessToken } }
    );
  }
}
