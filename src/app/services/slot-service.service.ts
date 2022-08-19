import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vaccine } from '../model/vaccine';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SlotServiceService {
  myHeaders = { Authorization: 'B ' };
  constructor(private http: HttpClient, private authService: AuthService) {}
  updateVaccine(v: Vaccine) {
    this.myHeaders['Authorization'] = 'Bearer ' + this.authService.accessToken;
    return this.http.put<Vaccine>('http://localhost:8888/vaccine/', v, {
      headers: this.myHeaders,
    });
  }
  addVaccine(v: Vaccine, userId: any, vaccineCompanyId: any) {
    this.myHeaders['Authorization'] = 'Bearer ' + this.authService.accessToken;
    return this.http.post<Vaccine>(
      'http://localhost:8888/vaccine/' + userId + '/' + vaccineCompanyId,
      v,
      { headers: this.myHeaders }
    );
  }
}
