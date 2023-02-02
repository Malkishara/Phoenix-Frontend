import { TestBed } from '@angular/core/testing';

import { JobVacanciesService } from './job-vacancies.service';

describe('JobVacanciesService', () => {
  let service: JobVacanciesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobVacanciesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
