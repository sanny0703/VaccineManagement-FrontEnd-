import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { Vaccine } from '../model/vaccine';

@Injectable({
  providedIn: 'root',
})
export class UsersViewService {
  constructor(private http: HttpClient) {}
  getPatients() {
    return this.http.get<Vaccine[]>('http://localhost:8888/vaccine');
  }
  searchPatientsByName(name: any) {
    return this.http.get<Vaccine[]>(
      'http://localhost:8888/vaccine/patientName/' + name
    );
  }
  getRegisteredUsers() {
    return this.http.get<User[]>('http://localhost:8888/user');
  }
  searchRegisteredUsersByName(name: any) {
    return this.http.get<User[]>('http://localhost:8888/user/userName/' + name);
  }
  deleterUser(id: any) {
    return this.http.delete<User>('http://localhost:8888/user/' + id);
  }
}
