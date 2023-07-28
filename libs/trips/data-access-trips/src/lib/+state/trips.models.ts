export interface Employee {
  department?: string;
  hoursPerWeek?: number;
  shift?: string;
  entranceNumber: number;
  locationAccuracy: number;
  accuracySource: string;
  realId: string;
  fixedMode?: string;
  secondaryFixedMode?: string;
  entryTime?: string;
  exitTime?: string;
  daysInOffice?: number;
  impossibleModes: string[];
  id: number;
  country: string;
  street: string;
  city: string;
  postalCode: string;
  longitude: number;
  latitude: number;
}

export interface Trip {
  startLocation: Location;
  endLocation: Location;
  startTime: string;
  endTime: string;
  directionToCompanyLocation: boolean;
  tripMode: TripMode;
  clusterTrip: boolean;
  clusterId: number;
  transportLegs: TransportLeg[];
  calculationReference: null;
  isInterventionTrip: boolean;
  id: number;
  mostSustainableTrip?: boolean;
}

export type TripMode = 'WALK' | 'BIKE' | 'PUBLIC_TRANSPORT' | 'CAR_DRIVER';

export interface Location {
  longitude: number;
  latitude: number;
}

export interface TransportLegDetails {
  geometry: {
    type: string;
    coordinates: [number, number][];
  };
  information: null;
  id: number;
}

export interface TransportLeg {
  distance: number;
  duration: number;
  startTime: string;
  endTime: string;
  detailedMode: string;
  indexInTrip: number;
  transportLegDetails?: TransportLegDetails;
  id: number;
}

export const createTrip = (): Trip => ({
  startLocation: {
    longitude: 14.321381405609271,
    latitude: 48.30475172186699,
  },
  endLocation: {
    longitude: 14.2985153,
    latitude: 48.31213,
  },
  startTime: '08:44:00',
  endTime: '09:00:00',
  directionToCompanyLocation: true,
  tripMode: 'BIKE',
  clusterTrip: false,
  clusterId: -1,
  transportLegs: [
    {
      distance: 2935.2,
      duration: 15.770000000000001,
      startTime: '08:44:00',
      endTime: '09:00:00',
      detailedMode: 'BIKE',
      indexInTrip: 1,
      transportLegDetails: {
        geometry: {
          type: 'LineString',
          coordinates: [
            [14.298337, 48.312217],
            [14.298191, 48.312084],
            [14.298631, 48.311662],
            [14.298374, 48.311519],
            [14.298744, 48.311217],
            [14.300372, 48.312126],
            [14.301259, 48.313087],
            [14.302996, 48.311301],
            [14.307121, 48.312989],
            [14.308078, 48.313549],
            [14.308792, 48.313268],
            [14.308998, 48.313352],
            [14.310174, 48.312229],
            [14.311082, 48.312053],
            [14.312972, 48.312742],
            [14.315578, 48.307832],
            [14.315376, 48.307779],
            [14.315718, 48.307178],
            [14.315923, 48.307229],
            [14.317778, 48.304062],
            [14.321374, 48.304767],
          ],
        },
        information: null,
        id: 2072882,
      },
      id: 2490086,
    },
  ],
  calculationReference: null,
  isInterventionTrip: false,
  id: 1336535,
});

export const createEmployee = (): Employee => ({
  entranceNumber: 0,
  locationAccuracy: 0.95,
  accuracySource: 'COMMUTER_ESTIMATION',
  realId: '2',
  impossibleModes: [],
  id: 283890,
  country: 'AT',
  street: 'Haydnstraße 72',
  city: 'Linz',
  postalCode: 'AT-4020',
  longitude: 14.306756195378712,
  latitude: 48.2676573080975,
});
