import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerProfileNavbarComponent } from './employer-profile-navbar.component';

describe('EmployerProfileNavbarComponent', () => {
  let component: EmployerProfileNavbarComponent;
  let fixture: ComponentFixture<EmployerProfileNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerProfileNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployerProfileNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
