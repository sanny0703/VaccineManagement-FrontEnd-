import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VaccineCompany } from '../model/VaccineCompany';

@Injectable({
  providedIn: 'root',
})
export class VaccineListService {
  constructor(private http: HttpClient) {}
  getAllVaccines() {
    return this.http.get<VaccineCompany[]>(
      'http://localhost:8888/vaccine_company'
    );
  }
  searchVaccines(name: string) {
    return this.http.get<VaccineCompany[]>(
      'http://localhost:8888/vaccine_company/' + name
    );
  }
}
