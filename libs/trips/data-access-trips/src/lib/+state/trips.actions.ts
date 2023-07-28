import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Trip } from './trips.models';

export const TripsActions = createActionGroup({
  source: 'Trips',
  events: {
    loadTrips: props<{
      street: string;
    }>(),
    loadTripsSuccess: props<{
      trips: Trip[];
    }>(),
    loadTripsFailure: props<{ error: string }>(),
    resetState: emptyProps(),
  },
});
