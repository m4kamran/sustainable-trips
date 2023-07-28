import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { RouterModule } from '@angular/router';
import { TripsDataAccessTripsModule } from '@sustainable-path/trips/data-access-trips';
import { InputAddressTripsComponent } from './input-address-trips/input-address-trips.component';
import { tripsFeatureTripsRoutes } from './lib.routes';
import { SustainablePathTripsComponent } from './sustainable-path-trips/sustainable-path-trips.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(tripsFeatureTripsRoutes),
    RouterModule,
    TripsDataAccessTripsModule,
    GoogleMapsModule,
  ],
  declarations: [InputAddressTripsComponent, SustainablePathTripsComponent],
})
export class TripsFeatureTripsModule {}
