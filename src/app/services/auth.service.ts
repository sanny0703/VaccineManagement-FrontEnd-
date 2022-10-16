import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  constructor(private http: HttpClient, private localStore: LocalStoreService) {
    this.currentUser = new User();
    this.accessToken = '';
  }
  public getUser() {
    this.getToken();
    // getting the currentUser
    if (this.currentUser.userName == '') {
      if (this.localStore.getData(AppUtils.USER) != '') {
        // if local storage has user
        this.getUserFromLocalStore();
      } else if (
        this.currentUser.userId != 0 &&
        this.currentUser.userId != undefined
      ) {
        //if user data not in local store, fetch from database if userId is not null
        this.http
          .get<User>(
            AppUtils.API_ENDPOINT + '/user/' + this.currentUser.userId,
            {
              headers: { Authorization: 'Bearer ' + this.accessToken },
            }
          )
          .subscribe({
            next: (res) => {
              this.currentUser = res;
              // store the fetched user data(encrypted :))
              this.localStore.storeData(
                AppUtils.USER,
                JSON.stringify(this.currentUser)
              );
            },
          });
      }
    }
  }
  private getToken() {
    if (this.accessToken == '') {
      if (this.localStore.getData(AppUtils.TOKEN) != '') {
        this.accessToken = this.localStore.getData(AppUtils.TOKEN);
      }
    }
  }
  private getUserFromLocalStore() {
    const user = JSON.parse(this.localStore.getData(AppUtils.USER));
    this.currentUser.userId = user.userId;
    this.currentUser.userEmail = user.userEmail;
    this.currentUser.userPassword = user.userPassword;
    this.currentUser.userName = user.userName;
    this.currentUser.userAadhar = user.userAadhar;
    this.currentUser.isAdmin = user.isAdmin;
  }

  public login(autheRequest: AuthenticationRequest) {
    return this.http.post<AuthenticationResponse>(
      AppUtils.API_ENDPOINT + '/auth/login',
      autheRequest,
      { observe: 'response' }
    );
  }
  public signup(user: User) {
    return this.http.post(AppUtils.API_ENDPOINT + '/auth/signup', user, {
      observe: 'response',
    });
  }
  public logout() {
    this.localStore.clearData();
    this.currentUser = new User();
    this.accessToken = '';
  }
}
