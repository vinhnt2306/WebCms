import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VouncherComponent } from './vouncher.component';

describe('VouncherComponent', () => {
  let component: VouncherComponent;
  let fixture: ComponentFixture<VouncherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VouncherComponent]
    });
    fixture = TestBed.createComponent(VouncherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
