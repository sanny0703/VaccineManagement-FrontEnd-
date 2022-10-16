import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppUtils } from '../model/AppUtils';
import { Company } from '../model/Company';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  addCompany(company: Company) {
    return this.http.post<Company>(
      AppUtils.API_ENDPOINT + '/company/',
      company,
      {
        headers: { Authorization: 'Bearer ' + this.authService.accessToken },
      }
    );
  }
  getCompanies() {
    return this.http.get<Company[]>(AppUtils.API_ENDPOINT + '/company', {
      headers: { Authorization: 'Bearer ' + this.authService.accessToken },
    });
  }
}
