import { TestBed } from '@angular/core/testing';

import { ShopizerService } from './shopizer.service';

describe('ShopizerService', () => {
  let service: ShopizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
