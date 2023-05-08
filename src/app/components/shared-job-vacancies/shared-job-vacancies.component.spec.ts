import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedJobVacanciesComponent } from './shared-job-vacancies.component';

describe('SharedJobVacanciesComponent', () => {
  let component: SharedJobVacanciesComponent;
  let fixture: ComponentFixture<SharedJobVacanciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedJobVacanciesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedJobVacanciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
