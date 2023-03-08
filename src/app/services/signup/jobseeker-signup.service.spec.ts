import { TestBed } from '@angular/core/testing';

import { JobseekerSignupService } from './jobseeker-signup.service';

describe('JobseekerSignupService', () => {
  let service: JobseekerSignupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobseekerSignupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
