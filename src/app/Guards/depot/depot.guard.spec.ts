import { TestBed } from '@angular/core/testing';

import { DepotGuard } from './depot.guard';

describe('AdminGuard', () => {
  let guard: DepotGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DepotGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
