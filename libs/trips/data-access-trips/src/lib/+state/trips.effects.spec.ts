import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';

import { TripsActions } from './trips.actions';
import { TripsEffects } from './trips.effects';
import { TripsFacade } from './trips.facade';

describe('TripsEffects', () => {
  let actions: Observable<Action>;
  let effects: TripsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        TripsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
        {
          provide: TripsFacade,
          useValue: {
            trips$: () => of([]),
          },
        },
      ],
    });

    effects = TestBed.inject(TripsEffects);
  });

  describe('loadTrips$', () => {
    it('should work', () => {
      actions = hot('-a-|', {
        a: TripsActions.loadTrips({ street: 'street' }),
      });

      const expected = hot('-a-|', {
        a: TripsActions.loadTripsSuccess({
          trips: [],
        }),
      });

      expect(effects.loadTrips$).toBeObservable(expected);
    });
  });
});
