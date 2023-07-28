import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SustainablePathTripsComponent } from './sustainable-path-trips.component';

describe('SustainablePathTripsComponent', () => {
  let component: SustainablePathTripsComponent;
  let fixture: ComponentFixture<SustainablePathTripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SustainablePathTripsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SustainablePathTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
