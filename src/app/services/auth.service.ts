import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { catchError, Subject, EMPTY, throwError } from 'rxjs';
import { AppUtils } from '../model/AppUtils';
import { AuthenticationRequest } from '../model/AuthenticationRequest';
import { AuthenticationResponse } from '../model/AuthenticationResponse';
import { User } from '../model/User';
import { LocalStoreService } from './local-store.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: User;
  accessToken: string;
  SERVER_ERROR = ' Something went wrong, Please try again';
  CLIENT_ERROR = ' Please check your credentials';

  constructor(private http: HttpClient, private toast: NgToastService) {
    this.currentUser = new User();
    this.accessToken = '';
  }
  getUser() {
    return this.http.get<User>(
      AppUtils.API_ENDPOINT + '/user/' + this.currentUser.userId,
      {
        headers: { Authorization: 'Bearer ' + this.accessToken },
      }
    );
  }

  login(autheRequest: AuthenticationRequest) {
    return this.http.post<AuthenticationResponse>(
      AppUtils.API_ENDPOINT + '/auth/login',
      autheRequest
    );
  }
  signup(user: User) {
    return this.http.post(AppUtils.API_ENDPOINT + '/auth/signup', user);
  }
}
