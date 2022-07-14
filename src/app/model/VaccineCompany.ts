import { Company } from './Company';

export class VaccineCompany {
  vaccineCompanyId?: number;
  vaccineName: string;
  vaccineDetails: string;
  company: Company;

  constructor() {
    this.vaccineName = 'default';
    this.vaccineDetails = 'default';
    this.company = new Company();
  }
}
