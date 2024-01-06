import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OderFollowComponent } from './oder-follow.component';

describe('OderFollowComponent', () => {
  let component: OderFollowComponent;
  let fixture: ComponentFixture<OderFollowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OderFollowComponent]
    });
    fixture = TestBed.createComponent(OderFollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
