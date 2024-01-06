import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupcustomerComponent } from './groupcustomer.component';

describe('GroupcustomerComponent', () => {
  let component: GroupcustomerComponent;
  let fixture: ComponentFixture<GroupcustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupcustomerComponent]
    });
    fixture = TestBed.createComponent(GroupcustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
