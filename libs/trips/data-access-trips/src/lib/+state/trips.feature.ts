import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';

import { TripsActions } from './trips.actions';
import { Trip } from './trips.models';

export const REPOSITORIES_FEATURE_KEY = 'trips';

export interface TripsState extends EntityState<Trip> {
  loading: boolean | null;
  error: string | null;
}

export interface TripsPartialState {
  readonly [REPOSITORIES_FEATURE_KEY]: TripsState;
}

export const tripsAdapter: EntityAdapter<Trip> = createEntityAdapter<Trip>();

export const initialTripsState: TripsState = tripsAdapter.getInitialState({
  loading: null,
  error: null,
});

export const tripsReducer = createReducer(
  initialTripsState,
  on(TripsActions.loadTrips, (state) => ({
    ...state,
    loading: true,
  })),
  on(TripsActions.loadTripsSuccess, (state, { trips }) =>
    tripsAdapter.setAll(trips, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  on(TripsActions.loadTripsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(TripsActions.resetState, () => ({
    ...initialTripsState,
  }))
);

export const tripsFeature = createFeature({
  name: REPOSITORIES_FEATURE_KEY,
  reducer: tripsReducer,
});
