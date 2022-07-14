import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vaccine } from '../model/vaccine';

@Injectable({
  providedIn: 'root',
})
export class SlotServiceService {
  constructor(private http: HttpClient) {}
  updateVaccine(v: Vaccine) {
    return this.http.put<Vaccine>('http://localhost:8888/vaccine/', v);
  }
  addVaccine(v: Vaccine, userId: any, vaccineCompanyId: any) {
    return this.http.post<Vaccine>(
      'http://localhost:8888/vaccine/' + userId + '/' + vaccineCompanyId,
      v
    );
  }
}
