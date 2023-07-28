import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TripsEffects } from './+state/trips.effects';
import { TripsFacade } from './+state/trips.facade';
import { tripsFeature } from './+state/trips.feature';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(tripsFeature),
    EffectsModule.forFeature([TripsEffects]),
  ],
  providers: [TripsFacade],
})
export class TripsDataAccessTripsModule {}
