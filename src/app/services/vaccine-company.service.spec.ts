import { TestBed } from '@angular/core/testing';

import { VaccineCompanyService } from './vaccine-company.service';

describe('VaccineCompanyService', () => {
  let service: VaccineCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaccineCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
