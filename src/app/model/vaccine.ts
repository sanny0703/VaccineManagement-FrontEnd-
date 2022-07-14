import { User } from './User';
import { VaccineCompany } from './VaccineCompany';

export class Vaccine {
  vaccineId?: number;
  patientName: string;
  patientAge?: number;
  patientGender: string;
  vaccineStatus: string;
  user: User;
  vaccineCompany: VaccineCompany;
  vaccineDate1?: Date = undefined;
  vaccineDate2?: Date = undefined;

  constructor() {
    this.patientName = '';
    this.patientGender = '';
    this.vaccineStatus = '';
    this.user = new User();
    this.vaccineCompany = new VaccineCompany();
  }
}
