import { TestBed } from '@angular/core/testing';

import { BalancesService } from './balances.service';

describe('BalancesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BalancesService = TestBed.get(BalancesService);
    expect(service).toBeTruthy();
  });
});
