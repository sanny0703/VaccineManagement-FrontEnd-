import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DailyReport } from '../model/DailyReport';
@Injectable({
  providedIn: 'root',
})
export class DailyReportService {
  constructor(public http: HttpClient) {}
  addReport(
    dailyReport: DailyReport,
    userId: any,
    vaccineId: any,
    companyId: any
  ) {
    return this.http.post<DailyReport>(
      'http://localhost:8888/report/' +
        userId +
        '/' +
        vaccineId +
        '/' +
        companyId,
      dailyReport
    );
  }
  getreports() {
    return this.http.get<DailyReport[]>('http://localhost:8888/report');
  }

  searchReportsByDate(date: any) {
    return this.http.get<DailyReport[]>(
      'http://localhost:8888/report/date/' + date
    );
  }

  searchReportsByName(name: any) {
    return this.http.get<DailyReport[]>(
      'http://localhost:8888/report/vaccine/' + name
    );
  }
}
