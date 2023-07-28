import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TripsFacade } from '@sustainable-path/trips/data-access-trips';
import { of } from 'rxjs';
import { InputAddressTripsComponent } from './input-address-trips.component';

describe('InputAddressTripsComponent', () => {
  let component: InputAddressTripsComponent;
  let fixture: ComponentFixture<InputAddressTripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), ReactiveFormsModule],
      declarations: [InputAddressTripsComponent],
      providers: [
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
        {
          provide: TripsFacade,
          useValue: {
            loading$: of(null),
            error$: of(null),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InputAddressTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
