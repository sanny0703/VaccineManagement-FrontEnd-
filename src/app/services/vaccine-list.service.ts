import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VaccineCompany } from '../model/VaccineCompany';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class VaccineListService {
  myHeaders = { Authorization: 'B ' };
  constructor(private http: HttpClient, private authService: AuthService) {}
  getAllVaccines() {
    this.myHeaders['Authorization'] = 'Bearer ' + this.authService.accessToken;
    return this.http.get<VaccineCompany[]>(
      'http://localhost:8888/vaccine_company',
      { headers: this.myHeaders }
    );
  }
  searchVaccines(name: string) {
    this.myHeaders['Authorization'] = 'Bearer ' + this.authService.accessToken;
    return this.http.get<VaccineCompany[]>(
      'http://localhost:8888/vaccine_company/' + name,
      { headers: this.myHeaders }
    );
  }
}
