import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppUtils } from '../model/AppUtils';
import { VaccineCompany } from '../model/VaccineCompany';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class VaccineCompanyService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  addVaccine(vaccine: VaccineCompany) {
    return this.http.post<VaccineCompany>(
      AppUtils.API_ENDPOINT + '/vaccine_company/',
      vaccine,
      {
        headers: { Authorization: 'Bearer ' + this.authService.accessToken },
      }
    );
  }
}
