import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: User;

  constructor(public http: HttpClient) {
    this.currentUser = new User();
  }

  addUser(user: User) {
    return this.http.post<User>('http://localhost:8888/user', user);
  }
  getUser(email: string) {
    return this.http.get<User>('http://localhost:8888/user/' + email);
  }
}
