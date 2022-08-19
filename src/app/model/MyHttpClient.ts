import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class MyHttpClient {
  constructor(public http: HttpClient, public authService: AuthService) {}
  createAuthorizationHeader(headers: HttpHeaders) {
    headers.append('Authorization', 'Bearer ' + this.authService.accessToken);
  }
  get(url: string) {
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, { headers: headers });
  }
  post(url: string, data: any) {
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, { headers: headers });
  }
}
