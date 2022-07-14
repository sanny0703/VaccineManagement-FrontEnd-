export class Company {
  companyId?: number;
  companyName: string;
  companyCountry: string;
  companyAddress: string;

  constructor() {
    this.companyName = 'default';
    this.companyAddress = 'default';
    this.companyCountry = 'default';
  }
}
