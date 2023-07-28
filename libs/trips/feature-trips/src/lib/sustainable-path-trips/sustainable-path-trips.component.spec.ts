import { ComponentFixture, TestBed } from '@angular/core/testing';
import {} from '@angular/google-maps';
import { ActivatedRoute } from '@angular/router';
import { TripsFacade } from '@sustainable-path/trips/data-access-trips';
import { of } from 'rxjs';
import { SustainablePathTripsComponent } from './sustainable-path-trips.component';

describe('SustainablePathTripsComponent', () => {
  let component: SustainablePathTripsComponent;
  let fixture: ComponentFixture<SustainablePathTripsComponent>;

  Object.defineProperty(global, 'google', {
    value: {
      maps: {
        Icon: {},
        Size: jest.fn(),
      },
    },
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SustainablePathTripsComponent],
      providers: [
        {
          provide: TripsFacade,
          useValue: {
            trips$: of(null),
            loading$: of(null),
            error$: of(null),
            calculateCarbonFootprint: () => 0,
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                street: 'street',
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SustainablePathTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
