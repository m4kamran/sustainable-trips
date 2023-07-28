import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';

import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { TripsActions } from './trips.actions';
import { TripsEffects } from './trips.effects';
import { TripsFacade } from './trips.facade';
import { TripsState, tripsFeature } from './trips.feature';

interface TestSchema {
  trips: TripsState;
}

describe('TripsFacade', () => {
  let facade: TripsFacade;
  let store: Store<TestSchema>;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(tripsFeature),
          EffectsModule.forFeature([TripsEffects]),
        ],
        providers: [TripsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(TripsFacade);
    });

    it('loading$ should return loading value', async () => {
      let loading = await firstValueFrom(facade.loading$);

      expect(loading).toBe(null);

      store.dispatch(
        TripsActions.loadTripsSuccess({
          trips: [],
        })
      );

      loading = await firstValueFrom(facade.loading$);

      expect(loading).toBe(false);
    });

    it('error$ should return error value', async () => {
      let error = await firstValueFrom(facade.error$);

      expect(error).toBe(null);

      store.dispatch(TripsActions.loadTripsFailure({ error: 'error' }));

      error = await firstValueFrom(facade.error$);

      expect(error).toBe('error');
    });

    it('trips$() should call http get', async () => {
      const spy = jest.spyOn(TestBed.inject(HttpClient), 'get');

      facade.getTrips$('street');

      expect(spy).toHaveBeenCalled();
    });
  });
});
