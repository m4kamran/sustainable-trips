import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { tripsResolverGuard } from './trips-resolver.guard';

describe('tripsResolverGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => tripsResolverGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
