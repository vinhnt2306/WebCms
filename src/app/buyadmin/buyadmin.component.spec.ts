import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyadminComponent } from './buyadmin.component';

describe('BuyadminComponent', () => {
  let component: BuyadminComponent;
  let fixture: ComponentFixture<BuyadminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyadminComponent]
    });
    fixture = TestBed.createComponent(BuyadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
