import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@sustainable-path/trips/feature-trips').then(
        (m) => m.TripsFeatureTripsModule
      ),
  },
];
