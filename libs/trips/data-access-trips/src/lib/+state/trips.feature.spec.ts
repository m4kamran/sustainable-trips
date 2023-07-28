import { TripsActions } from './trips.actions';
import { TripsState, initialTripsState, tripsReducer } from './trips.feature';

describe('Trips Reducer', () => {
  describe('valid Trips actions', () => {
    it('loadTrips should set loading', () => {
      const action = TripsActions.loadTrips({
        street: 'street',
      });

      const result: TripsState = tripsReducer(initialTripsState, action);

      expect(result.loading).toBe(true);
    });

    it('loadTripsSuccess should return the list of known Trips', () => {
      const action = TripsActions.loadTripsSuccess({
        trips: [],
      });

      const result: TripsState = tripsReducer(initialTripsState, action);

      expect(result.loading).toBe(false);
    });

    it('loadTripsFailure should set error and loading', () => {
      const action = TripsActions.loadTripsFailure({
        error: 'error',
      });

      const result: TripsState = tripsReducer(initialTripsState, action);

      expect(result.error).toBe('error');
      expect(result.loading).toBe(false);
    });

    it('resetState should reset state', () => {
      const action = TripsActions.resetState();

      const result: TripsState = tripsReducer(initialTripsState, action);

      expect(result).toEqual(initialTripsState);
    });
  });
});
