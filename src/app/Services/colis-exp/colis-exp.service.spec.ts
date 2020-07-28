import { TestBed } from '@angular/core/testing';

import { ColisExpService } from './colis-exp.service';

describe('ColisExpService', () => {
  let service: ColisExpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColisExpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
