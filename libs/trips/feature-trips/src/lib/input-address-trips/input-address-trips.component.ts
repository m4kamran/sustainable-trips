import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TripsFacade } from '@sustainable-path/trips/data-access-trips';
import { filter } from 'rxjs';

@Component({
  selector: 'sustainable-path-input-address-trips',
  templateUrl: './input-address-trips.component.html',
  styleUrls: ['./input-address-trips.component.scss'],
})
export class InputAddressTripsComponent {
  private readonly router = inject(Router);
  private readonly tripsFacade = inject(TripsFacade);

  public error$ = this.tripsFacade.error$;
  public loading$ = this.tripsFacade.loading$;

  public form = new FormGroup({
    street: new FormControl('', [Validators.required]),
  });

  constructor(private route: ActivatedRoute) {}

  public onSubmit(): void {
    this.tripsFacade.loadTrips(this.form.value.street || '');

    this.loading$.pipe(filter((loading) => loading === false)).subscribe(() => {
      this.router.navigate(['trips', this.form.value.street], {
        relativeTo: this.route,
      });
    });
  }
}
