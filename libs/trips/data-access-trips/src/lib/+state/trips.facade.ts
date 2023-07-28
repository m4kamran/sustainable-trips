import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, map, switchMap } from 'rxjs';
import { TripsActions } from './trips.actions';
import { tripsFeature } from './trips.feature';
import { Employee, Trip, TripMode } from './trips.models';

@Injectable()
export class TripsFacade {
  private readonly store = inject(Store);
  private readonly http = inject(HttpClient);

  public loading$ = this.store.pipe(select(tripsFeature.selectLoading));
  public error$ = this.store.pipe(select(tripsFeature.selectError));
  public trips$ = this.store.pipe(
    select(tripsFeature.selectEntities),
    map((tripEtities) => {
      const trips = Object.values(tripEtities).filter(
        (t) => t?.directionToCompanyLocation
      ) as Trip[];
      const sustainableTrip = this.calculateMostSustainableTrip(trips);
      return trips.map((trip) => {
        return {
          ...trip,
          mostSustainableTrip: trip.id === sustainableTrip?.id,
        };
      });
    })
  );

  public loadTrips(street: string) {
    this.store.dispatch(TripsActions.loadTrips({ street }));
  }

  public getTrips$(street: string): Observable<Trip[]> {
    return this.http
      .get<Employee[]>(
        'https://0d348230-8a4d-42e0-b3e4-98c4e383db6f.mock.pstmn.io/api/v1/locations/959/employeeLocations'
      )
      .pipe(
        switchMap((employees) => {
          const employee = employees.find((e) => e.street === street);
          console.log(employee);

          if (!employee) {
            throw new Error('Employee not found');
          }
          return this.http
            .get<Trip[]>(
              `https://0d348230-8a4d-42e0-b3e4-98c4e383db6f.mock.pstmn.io/api/v1/locations/959/employees/${employee.id}/trips`
            )
            .pipe(
              map((trips) => {
                return trips;
              })
            );
        })
      );
  }

  public calculateMostSustainableTrip(trips: Trip[]): Trip | null {
    let minCarbonFootprint = Number.MAX_VALUE;
    let minDuration = Number.MAX_VALUE;
    let mostSustainableTrip: Trip | null = null;

    for (const trip of trips) {
      let totalDistance = 0;
      let totalDuration = 0;

      for (const leg of trip.transportLegs) {
        totalDistance += leg.distance;
        totalDuration += leg.duration || 0;
      }

      const carbonFootprint = this.calculateCarbonFootprint(
        totalDistance,
        trip.tripMode
      );

      if (
        carbonFootprint < minCarbonFootprint ||
        (carbonFootprint === minCarbonFootprint && totalDuration < minDuration)
      ) {
        minCarbonFootprint = carbonFootprint;
        minDuration = totalDuration;
        mostSustainableTrip = trip;
      }
    }

    return mostSustainableTrip;
  }

  public calculateCarbonFootprint(distance: number, mode: TripMode): number {
    const carbonFactors = {
      CAR_DRIVER: 0.2,
      BIKE: 0,
      PUBLIC_TRANSPORT: 0.03,
      WALK: 0,
    };

    const carbonFactor = carbonFactors[mode] || 0;
    return distance * carbonFactor;
  }

  public resetState() {
    this.store.dispatch(TripsActions.resetState());
  }
}
