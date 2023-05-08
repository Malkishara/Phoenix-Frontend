import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedJobseekerDataComponent } from './applied-jobseeker-data.component';

describe('AppliedJobseekerDataComponent', () => {
  let component: AppliedJobseekerDataComponent;
  let fixture: ComponentFixture<AppliedJobseekerDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppliedJobseekerDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppliedJobseekerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
