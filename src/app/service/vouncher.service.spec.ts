import { TestBed } from '@angular/core/testing';

import { VouncherService } from './vouncher.service';

describe('VouncherService', () => {
  let service: VouncherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VouncherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
