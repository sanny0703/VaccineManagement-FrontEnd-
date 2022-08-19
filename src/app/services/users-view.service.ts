import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { Vaccine } from '../model/vaccine';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsersViewService {
  myHeaders = { Authorization: 'B ' };
  constructor(private http: HttpClient, private authService: AuthService) {}
  getVaccinesAdministered() {
    this.myHeaders['Authorization'] = 'Bearer ' + this.authService.accessToken;
    return this.http.get<Vaccine[]>('http://localhost:8888/vaccine', {
      headers: this.myHeaders,
    });
  }
  searchVaccinesByPatientName(name: any) {
    this.myHeaders['Authorization'] = 'Bearer ' + this.authService.accessToken;
    return this.http.get<Vaccine[]>(
      'http://localhost:8888/vaccine/patientName/' + name,
      { headers: this.myHeaders }
    );
  }
  getRegisteredUsers() {
    this.myHeaders['Authorization'] = 'Bearer ' + this.authService.accessToken;
    return this.http.get<User[]>('http://localhost:8888/user', {
      headers: this.myHeaders,
    });
  }
  searchRegisteredUsersByName(name: any) {
    this.myHeaders['Authorization'] = 'Bearer ' + this.authService.accessToken;
    return this.http.get<User[]>(
      'http://localhost:8888/user/userName/' + name,
      { headers: this.myHeaders }
    );
  }
  deleterUser(id: any) {
    this.myHeaders['Authorization'] = 'Bearer ' + this.authService.accessToken;
    return this.http.delete<User>('http://localhost:8888/user/' + id, {
      headers: this.myHeaders,
    });
  }
}
