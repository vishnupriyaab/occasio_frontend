import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { employeeAuthGuardGuard } from './employee-auth-guard.guard';

describe('employeeAuthGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => employeeAuthGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
