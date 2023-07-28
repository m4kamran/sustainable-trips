import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nx/angular';
import { map } from 'rxjs';
import { TripsActions } from './trips.actions';
import { TripsFacade } from './trips.facade';

@Injectable()
export class TripsEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);
  private tripsFacade = inject(TripsFacade);

  loadTrips$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TripsActions.loadTrips),
      fetch({
        run: ({ street }) => {
          return this.tripsFacade.getTrips$(street).pipe(
            map((trips) => {
              return TripsActions.loadTripsSuccess({ trips });
            })
          );
        },

        onError: (error: any) => {
          return TripsActions.loadTripsFailure({ error });
        },
      })
    )
  );
}
