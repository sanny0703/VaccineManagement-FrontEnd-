import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppUtils } from '../model/AppUtils';
import { Vaccine } from '../model/vaccine';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SlotServiceService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  updateVaccine(v: Vaccine) {
    return this.http.put<Vaccine>(AppUtils.API_ENDPOINT + '/vaccine/', v, {
      headers: { Authorization: 'Bearer ' + this.authService.accessToken },
    });
  }
  addVaccine(v: Vaccine, userId: any, vaccineCompanyId: any) {
    return this.http.post<Vaccine>(
      AppUtils.API_ENDPOINT + '/vaccine/' + userId + '/' + vaccineCompanyId,
      v,
      { headers: { Authorization: 'Bearer ' + this.authService.accessToken } }
    );
  }
}
