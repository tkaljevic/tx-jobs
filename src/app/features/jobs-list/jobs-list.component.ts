import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CurrentPagination, JobAd, Pagination } from '@app-models';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  first,
  map,
  Observable,
} from 'rxjs';
import * as JobActions from '../../core/store/actions/job.actions';
import * as JobSelectors from '../../core/store/selectors/job.selectors';
import { AddEditJobComponent } from './components/add-edit-job/add-edit-job.component';
import { FilterJobsComponent } from './components/filter-jobs/filter-jobs.component';
import { JobActionsComponent } from './components/job-actions/job-actions.component';
import { MobileMenuComponent } from './components/mobile-menu/mobile-menu.component';

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
    MatPaginatorModule,
    MatDialogModule,
    FilterJobsComponent,
  ],
  templateUrl: './jobs-list.component.html',
  styleUrl: './jobs-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobsListComponent implements OnInit {
  //#region Component props

  public vm$: Observable<ViewModel>;

  private jobs$ = new BehaviorSubject<JobAd[]>([]);
  private pagination$ = new BehaviorSubject<Pagination>({} as Pagination);
  private currentPagination$ = new BehaviorSubject<CurrentPagination>(
    {} as CurrentPagination
  );

  private store = inject(Store);
  private destroyRef = inject(DestroyRef);
  private dialog = inject(MatDialog);

  //#endregion

  //#region Lifecycle Hooks

  ngOnInit(): void {
    this.initPaginator();
    this.initCurrentPagination();
    this.initJobsSubscription();
    this.initJobs();
    this.initViewModel();
  }

  //#endregion

  //#region Init

  private initViewModel(): void {
    this.vm$ = combineLatest([
      this.jobs$,
      this.pagination$,
      this.currentPagination$,
    ]).pipe(
      map(([jobs, pagination, currentPagination]) => ({
        jobs,
        pagination,
        currentPagination,
      }))
    );
  }

  private initJobs(): void {
    this.store
      .select(JobSelectors.currentPaginationSelector)
      .pipe(
        filter((x) => !!x.page && !!x.perPage),
        first(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(this.handleInitialJobLoad);
  }

  private initCurrentPagination(): void {
    this.store
      .select(JobSelectors.currentPaginationSelector)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(this.handleCurrentPagination);
  }

  private initPaginator(): void {
    this.store
      .select(JobSelectors.jobsPaginationSelector)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(this.handlePaginator);
  }

  private initJobsSubscription(): void {
    this.store
      .select(JobSelectors.allJobsSelector)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(this.handleJobs);
  }

  //#endregion

  //#region UI Methods

  onPaginationChange(event: PageEvent) {
    this.store.dispatch(
      JobActions.setCurrentPagination({
        page: event.pageIndex + 1,
        perPage: event.pageSize,
      })
    );

    this.store.dispatch(
      JobActions.loadJobsAction({
        page: event.pageIndex + 1,
        perPage: event.pageSize,
      })
    );
  }

  onAddJob(): void {
    const addJobRef = this.dialog.open(AddEditJobComponent, {
      data: {},
    });
    addJobRef
      .afterClosed()
      .pipe(filter((response) => !!response))
      .subscribe(this.handleNewJob);
  }

  //#endregion

  //#region Handlers

  private handleJobs = (jobs: JobAd[]): void => {
    this.jobs$.next(jobs);
  };

  private handlePaginator = (data: Pagination): void => {
    this.pagination$.next(data);
  };

  private handleNewJob = (job: Partial<JobAd>): void => {
    this.store.dispatch(JobActions.addNewJobAction({ job }));
  };

  private handleCurrentPagination = (pagination: CurrentPagination): void => {
    this.currentPagination$.next(pagination);
  };

  private handleInitialJobLoad = (pagination: CurrentPagination): void => {
    this.store.dispatch(
      JobActions.loadJobsAction({
        page: 1,
        perPage: pagination.perPage,
      })
    );
  };

  //#endregion
}

interface ViewModel {
  jobs: JobAd[];
  pagination: Pagination;
  currentPagination: CurrentPagination;
}
