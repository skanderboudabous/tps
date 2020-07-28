import { TestBed } from '@angular/core/testing';

import { ColisRecuService } from './colis-recu.service';

describe('ColisRecuService', () => {
  let service: ColisRecuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColisRecuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
