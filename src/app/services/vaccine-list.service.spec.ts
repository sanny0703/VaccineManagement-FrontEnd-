import { TestBed } from '@angular/core/testing';

import { VaccineListService } from './vaccine-list.service';

describe('VaccineListService', () => {
  let service: VaccineListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaccineListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
