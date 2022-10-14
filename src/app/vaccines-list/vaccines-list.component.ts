import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Company } from '../model/Company';
import { countriesList } from '../model/Country_data';
import { User } from '../model/User';
import { VaccineCompany } from '../model/VaccineCompany';
import { AuthService } from '../services/auth.service';
import { UsersViewService } from '../services/users-view.service';
import { VaccineListService } from '../services/vaccine-list.service';
import { CompanyService } from '../services/company.service';
import { VaccineCompanyService } from '../services/vaccine-company.service';

@Component({
  selector: 'app-vaccines-list',
  templateUrl: './vaccines-list.component.html',
  styleUrls: ['./vaccines-list.component.css'],
})
export class VaccinesListComponent implements OnInit {
  vaccineCompanies: VaccineCompany[];
  searchModel: any;
  showCompanyForm: boolean;
  showVaccineForm: boolean;
  addName: string;
  addSelection: string;
  addDetails: string;
  countries: any = countriesList;
  companies: Company[] = new Array();

  constructor(
    public viewService: UsersViewService,
    public router: Router,
    public authService: AuthService,
    public vaccineListService: VaccineListService,
    private toast: NgToastService,
    private companyService: CompanyService,
    private vaccineCompanyService: VaccineCompanyService
  ) {
    this.vaccineCompanies = new Array<VaccineCompany>();
    this.searchModel = { name: '' };
    this.showCompanyForm = false;
    this.showVaccineForm = false;
    this.addDetails = '';
    this.addName = '';
    this.addSelection = '';
  }

  ngOnInit(): void {
    if (this.authService.currentUser.userName === '') {
      this.NavigateHome();
    } else {
      this.Show();
    }
  }
  getData() {
    this.companyService.getCompanies().subscribe({
      next: (res) => (this.companies = res),
    });
  }
  refreshPage() {
    this.router.navigateByUrl('vaccineList');
  }
  Show() {
    this.vaccineListService.getAllVaccines().subscribe({
      next: (res) => {
        this.vaccineCompanies = res;
      },
      error: (e) => {
        this.toast.error({
          detail: '!!Oops',
          summary: 'Something went wrong',
          duration: 6000,
        });
      },
    });
  }

  Search() {
    this.vaccineListService.searchVaccines(this.searchModel.name).subscribe({
      next: (res) => {
        this.vaccineCompanies = res;
        console.log(res);
      },
      error: (e) => {
        this.toast.error({
          detail: '!!Oops',
          summary: 'Something went wrong',
          duration: 6000,
        });
      },
    });
  }
  NavigateHome() {
    this.router.navigateByUrl('home');
  }

  NavigateVaccinesList() {
    this.router.navigateByUrl('vaccineList');
  }
  NavigateViewRegistered() {
    this.router.navigateByUrl('view_registered');
  }
  NavigateViewAll() {
    this.router.navigateByUrl('view_all');
  }

  NavigateSlot() {
    this.router.navigateByUrl('bookSlot');
  }
  NavigateDailyReport() {
    this.router.navigateByUrl('dailyReport');
  }
  logout() {
    this.authService.currentUser = new User();
  }
  addCompany() {
    const company = new Company();
    company.companyName = this.addName;
    company.companyAddress = this.addDetails;
    company.companyCountry = this.addSelection;
    this.companyService.addCompany(company).subscribe({
      next: (res) => {
        this.toast.success({
          detail: 'Success',
          summary: 'Company Addedd Successfully',
          duration: 5000,
        });
        this.showCompanyForm = false;
        this.addName = '';
        this.addDetails = '';
        this.addSelection = '';
        this.getData();
      },
      error: (e) => {
        this.toast.error({
          detail: '!!Oops',
          summary: 'Something went wrong',
          duration: 5000,
        });
      },
    });
  }
  addVaccine() {
    const company = this.companies[Number(this.addSelection)];
    console.warn(this.addSelection);
    const vaccine = new VaccineCompany();
    vaccine.company = company;
    vaccine.vaccineName = this.addName;
    vaccine.vaccineDetails = this.addDetails;
    console.warn(vaccine);
    this.vaccineCompanyService.addVaccine(vaccine).subscribe({
      next: (res) => {
        this.toast.success({
          detail: 'Success',
          summary: 'Vaccine Addedd Successfully',
          duration: 5000,
        });
        this.showVaccineForm = false;
        this.addName = '';
        this.addDetails = '';
        this.addSelection = '';
        this.Show();
      },
      error: (e) => {
        this.toast.error({
          detail: '!!Oops',
          summary: 'Something went wrong',
          duration: 5000,
        });
      },
    });
  }
  displayVaccineForm() {
    this.getData();
    this.showCompanyForm = false;
    this.showVaccineForm = !this.showVaccineForm;
  }
  displayCompanyForm() {
    this.showVaccineForm = false;
    this.showCompanyForm = !this.showCompanyForm;
  }
}
