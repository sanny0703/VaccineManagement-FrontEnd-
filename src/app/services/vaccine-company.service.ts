import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VaccineCompany } from '../model/VaccineCompany';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class VaccineCompanyService {
  myHeaders = { Authorization: 'B ' };
  constructor(private http: HttpClient, private authService: AuthService) {}

  addVaccine(vaccine: VaccineCompany) {
    this.myHeaders['Authorization'] = 'Bearer ' + this.authService.accessToken;
    return this.http.post<VaccineCompany>(
      'http://localhost:8888/vaccine_company/',
      vaccine,
      {
        headers: this.myHeaders,
      }
    );
  }
}
