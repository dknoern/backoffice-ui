import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocomotivesComponent } from './locomotives.component';

describe('EnforcementsComponent', () => {
  let component: LocomotivesComponent;
  let fixture: ComponentFixture<LocomotivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocomotivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocomotivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
