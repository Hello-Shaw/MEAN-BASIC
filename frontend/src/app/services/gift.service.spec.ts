import { TestBed, inject } from '@angular/core/testing';

import { GiftService } from './gift.service';

describe('GiftService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GiftService]
    });
  });

  it('should be created', inject([GiftService], (service: GiftService) => {
    expect(service).toBeTruthy();
  }));
});
