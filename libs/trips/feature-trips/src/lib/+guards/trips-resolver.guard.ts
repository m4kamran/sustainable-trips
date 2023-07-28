import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TripsFacade } from '@sustainable-path/trips/data-access-trips';
import { filter, map, tap, withLatestFrom } from 'rxjs';

export const tripsResolverGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const tripsFacade = inject(TripsFacade);

  return tripsFacade.loading$.pipe(
    tap((loading) => {
      if (loading === null) {
        tripsFacade.loadTrips(route.params['street'] || '');
      }
    }),
    withLatestFrom(tripsFacade.error$),
    filter(([loading, _]) => loading === false),
    tap(([_, error]) => {
      if (error) {
        router.navigate(['/']);
        tripsFacade.resetState();
      }
    }),
    map(() => true)
  );
};
