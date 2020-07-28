import { TestBed } from '@angular/core/testing';

import { CaissieGuard } from './caissie.guard';

describe('UserGuard', () => {
  let guard: CaissieGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CaissieGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
