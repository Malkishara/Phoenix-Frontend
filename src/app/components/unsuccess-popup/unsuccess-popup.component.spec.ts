import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsuccessPopupComponent } from './unsuccess-popup.component';

describe('UnsuccessPopupComponent', () => {
  let component: UnsuccessPopupComponent;
  let fixture: ComponentFixture<UnsuccessPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnsuccessPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnsuccessPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
