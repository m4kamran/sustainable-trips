import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  TransportLeg,
  TripsFacade,
} from '@sustainable-path/trips/data-access-trips';

import { BehaviorSubject, map, withLatestFrom } from 'rxjs';

@Component({
  selector: 'sustainable-path-sustainable-path-trips',
  templateUrl: './sustainable-path-trips.component.html',
  styleUrls: ['./sustainable-path-trips.component.scss'],
})
export class SustainablePathTripsComponent {
  private _selectedTripId = new BehaviorSubject<number | null>(null);
  public selectedTripId$ = this._selectedTripId.asObservable();
  public trips$ = this.tripsFacade.trips$;
  public selectedTrip$ = this.selectedTripId$.pipe(
    withLatestFrom(this.trips$),
    map(([id, trips]) => {
      if (!id) return trips.find((trip) => trip.mostSustainableTrip);
      return trips.find((trip) => {
        return trip?.id === id;
      });
    })
  );

  public colors = {
    WALK: 'bg-blue-500',
    BIKE: 'bg-green-500',
    PUBLIC_TRANSPORT: 'bg-orange-500',
    CAR_DRIVER: 'bg-red-500',
  };
  public userIcon: google.maps.Icon = {
    url: 'assets/images/map-user.png',
    scaledSize: new google.maps.Size(30, 30),
  };
  public companyIcon: google.maps.Icon = {
    url: 'assets/images/map-company.png',
    scaledSize: new google.maps.Size(50, 50),
  };
  public street = this.route.snapshot.params['street'];
  public calculateCarbonFootprint = this.tripsFacade.calculateCarbonFootprint;

  constructor(
    private tripsFacade: TripsFacade,
    private route: ActivatedRoute
  ) {}

  public toLatLngLiteralOfAllCoordinates(transportLegs: TransportLeg[]) {
    const coordinates = transportLegs.reduce((acc, leg) => {
      return [
        ...acc,
        ...(leg.transportLegDetails?.geometry?.coordinates || []),
      ];
    }, [] as [number, number][]);

    return coordinates.map((coordinate) => {
      return { lat: coordinate[1], lng: coordinate[0] };
    });
  }

  public selectTrip(id: number) {
    this._selectedTripId.next(id);
  }
}
