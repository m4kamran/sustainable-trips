import { Route } from '@angular/router';
import { tripsResolverGuard } from './+guards/trips-resolver.guard';
import { InputAddressTripsComponent } from './input-address-trips/input-address-trips.component';
import { SustainablePathTripsComponent } from './sustainable-path-trips/sustainable-path-trips.component';

export const tripsFeatureTripsRoutes: Route[] = [
  {
    path: '',
    component: InputAddressTripsComponent,
  },
  {
    path: 'trips/:street',
    canActivate: [tripsResolverGuard],
    component: SustainablePathTripsComponent,
  },
];
