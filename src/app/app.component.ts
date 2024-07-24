import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JobAd } from '@app-models';
import { HttpLoaderComponent } from "@core-components";
import { select, Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import * as JobActions from './core/store/actions/job.actions';
import * as JobSelectors from './core/store/selectors/job.selectors';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpLoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  jobs$ = new BehaviorSubject<JobAd[]>([]);
  store = inject(Store)

  onTest() {
    this.store.dispatch(JobActions.loadJobsAction());

    this.store
      .pipe(
        select(JobSelectors.allJobsSelector)
      ).subscribe(jobs => {
        this.jobs$.next(jobs);
      })
  }
}
