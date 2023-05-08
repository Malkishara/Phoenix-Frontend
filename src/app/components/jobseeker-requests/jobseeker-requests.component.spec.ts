import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerRequestsComponent } from './jobseeker-requests.component';

describe('JobseekerRequestsComponent', () => {
  let component: JobseekerRequestsComponent;
  let fixture: ComponentFixture<JobseekerRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobseekerRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobseekerRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
