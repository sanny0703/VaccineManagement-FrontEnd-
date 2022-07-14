import { Company } from './Company';
import { User } from './User';
import { Vaccine } from './vaccine';

export class DailyReport {
  reportId?: number;
  reportDate?: Date;
  reportTime: string;
  reportStatus: string;
  reportDescription: string;
  user: User;
  vaccineName: string;
  vaccine: Vaccine;
  company: Company;

  constructor() {
    this.reportDescription = '';
    this.reportTime = '';
    this.reportStatus = '';
    this.vaccineName = '';
    this.user = new User();
    this.vaccine = new Vaccine();
    this.company = new Company();
  }
}
