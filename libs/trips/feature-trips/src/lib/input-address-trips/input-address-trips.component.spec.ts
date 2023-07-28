import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputAddressTripsComponent } from './input-address-trips.component';

describe('InputAddressTripsComponent', () => {
  let component: InputAddressTripsComponent;
  let fixture: ComponentFixture<InputAddressTripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputAddressTripsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputAddressTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
