import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '../model/Company';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  myHeaders = { Authorization: 'B ' };
  constructor(private http: HttpClient, private authService: AuthService) {}

  addCompany(company:Company){
    this.myHeaders['Authorization'] = 'Bearer ' + this.authService.accessToken;
    return this.http.post<Company>('http://localhost:8888/company/', company, {
      headers: this.myHeaders,
    });
  }
  getCompanies(){
    this.myHeaders['Authorization'] = 'Bearer ' + this.authService.accessToken;
    return this.http.get<Company[]>('http://localhost:8888/company', {
      headers: this.myHeaders,
    });
  }
}
