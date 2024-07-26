import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { JobAd, Pagination } from '@app-models';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { initialState } from 'src/app/core/store/reducers/job.reducer';
import * as JobActions from '../../core/store/actions/job.actions';
import * as JobSelectors from '../../core/store/selectors/job.selectors';
import { JobActionsComponent } from "./components/job-actions/job-actions.component";
import { MobileMenuComponent } from "./components/mobile-menu/mobile-menu.component";


@Component({
  selector: 'app-jobs-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MobileMenuComponent,
    JobActionsComponent,
    MatPaginatorModule
  ],
  templateUrl: './jobs-list.component.html',
  styleUrl: './jobs-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobsListComponent implements OnInit {

  //#region Component props

  public jobs$ = new BehaviorSubject<JobAd[]>([]);
  public pagination$ = new BehaviorSubject<Pagination>({} as Pagination);
  private store = inject(Store);
  private destroyRef = inject(DestroyRef)

  //#endregion

  //#region Lifecycle Hooks

  ngOnInit(): void {
    this.initPaginator();
    this.initJobs();
    this.initJobsSubscription();
  }

  //#endregion

  //#region Init

  private initJobs(): void {
    this.store.dispatch(JobActions.loadJobsAction({ page: initialState.jobsData.first, perPage: initialState.jobsData.pages }));
  }

  private initPaginator(): void {
    this.store.select(JobSelectors.jobsPaginationSelector)
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(this.handlePaginator)
  }

  private initJobsSubscription(): void {
    this.store.select(JobSelectors.allJobsSelector)
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe(this.handleJobs);
  }


  //#endregion

  //#region UI Methods

  onPaginationChange(event: PageEvent) {
    this.store.dispatch(JobActions.loadJobsAction({
      page: event.pageIndex + 1,
      perPage: event.pageSize
    }));
  }

  //#endregion

  //#region Handlers

  private handleJobs = (jobs: JobAd[]): void => {
    this.jobs$.next(jobs);
  }

  private handlePaginator = (data: Pagination): void => {
    this.pagination$.next(data);
  }

  //#endregion
}
