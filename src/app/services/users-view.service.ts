import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppUtils } from '../model/AppUtils';
import { User } from '../model/User';
import { Vaccine } from '../model/vaccine';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsersViewService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  getVaccinesAdministered() {
    return this.http.get<Vaccine[]>(AppUtils.API_ENDPOINT + '/vaccine', {
      headers: { Authorization: 'Bearer ' + this.authService.accessToken },
    });
  }
  searchVaccinesByPatientName(name: any) {
    return this.http.get<Vaccine[]>(
      AppUtils.API_ENDPOINT + '/vaccine/patientName/' + name,
      { headers: { Authorization: 'Bearer ' + this.authService.accessToken } }
    );
  }
  getRegisteredUsers() {
    return this.http.get<User[]>(AppUtils.API_ENDPOINT + '/user', {
      headers: { Authorization: 'Bearer ' + this.authService.accessToken },
    });
  }
  searchRegisteredUsersByName(name: any) {
    return this.http.get<User[]>(
      AppUtils.API_ENDPOINT + '/user/userName/' + name,
      { headers: { Authorization: 'Bearer ' + this.authService.accessToken } }
    );
  }
  deleterUser(id: any) {
    return this.http.delete<User>(AppUtils.API_ENDPOINT + '/user/' + id, {
      headers: { Authorization: 'Bearer ' + this.authService.accessToken },
    });
  }
}
