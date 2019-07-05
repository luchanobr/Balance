import { TestBed, async, inject } from '@angular/core/testing';

import { ResetpasswordGuard } from './resetpassword.guard';

describe('ResetpasswordGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResetpasswordGuard]
    });
  });

  it('should ...', inject([ResetpasswordGuard], (guard: ResetpasswordGuard) => {
    expect(guard).toBeTruthy();
  }));
});
