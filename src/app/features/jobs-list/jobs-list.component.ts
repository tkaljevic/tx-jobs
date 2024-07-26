import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { JobAd } from '@app-models';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import * as JobActions from '../../core/store/actions/job.actions';
import * as JobSelectors from '../../core/store/selectors/job.selectors';
import { JobActionsComponent } from "./components/job-actions/job-actions.component";
import { MobileMenuComponent } from "./components/mobile-menu/mobile-menu.component";


@Component({
  selector: 'app-jobs-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule, MatCardModule, MobileMenuComponent, JobActionsComponent],
  templateUrl: './jobs-list.component.html',
  styleUrl: './jobs-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobsListComponent implements OnInit {

  //#region Component props

  public jobs$ = new BehaviorSubject<JobAd[]>([]);
  private store = inject(Store);
  private destroyRef = inject(DestroyRef)

  //#endregion

  //#region Lifecycle Hooks

  ngOnInit(): void {
    this.initJobs();
    this.initJobsSubscription();
  }

  //#endregion

  //#region Init

  private initJobs(): void {
    this.store.dispatch(JobActions.loadJobsAction({ start: 0, limit: 5 }));
  }

  private initJobsSubscription(): void {
    this.store.select(JobSelectors.allJobsSelector)
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe(this.handleJobs);
  }


  //#endregion

  //#region Handlers

  private handleJobs = (jobs: JobAd[]): void => {
    this.jobs$.next(jobs);
  }

  //#endregion
}
