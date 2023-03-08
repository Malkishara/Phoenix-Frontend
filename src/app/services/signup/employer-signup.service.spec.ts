import { TestBed } from '@angular/core/testing';

import { EmployerSignupService } from './employer-signup.service';

describe('EmployerSignupService', () => {
  let service: EmployerSignupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployerSignupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
