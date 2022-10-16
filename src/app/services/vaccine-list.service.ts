import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppUtils } from '../model/AppUtils';
import { VaccineCompany } from '../model/VaccineCompany';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class VaccineListService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  getAllVaccines() {
    return this.http.get<VaccineCompany[]>(
      AppUtils.API_ENDPOINT + '/vaccine_company',
      { headers: { Authorization: 'Bearer ' + this.authService.accessToken } }
    );
  }
  searchVaccines(name: string) {
    return this.http.get<VaccineCompany[]>(
      AppUtils.API_ENDPOINT + '/vaccine_company/searchByName/' + name,
      { headers: { Authorization: 'Bearer ' + this.authService.accessToken } }
    );
  }
}
