import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { JobAd, Pagination } from '@app-models';
import { ToasterService } from '@core-services';
import { Store } from '@ngrx/store';
import { BehaviorSubject, filter } from 'rxjs';
import * as JobActions from '../../core/store/actions/job.actions';
import * as JobSelectors from '../../core/store/selectors/job.selectors';
import { AddJobComponent } from './components/add-job/add-job.component';
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
    MatPaginatorModule,
    MatDialogModule
  ],
  templateUrl: './jobs-list.component.html',
  styleUrl: './jobs-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobsListComponent implements OnInit {

  //#region Component props

  public jobs$ = new BehaviorSubject<JobAd[]>([]);
  public pagination$ = new BehaviorSubject<Pagination>({} as Pagination);
  public perPage = 5;
  private currentPage = 1;
  private store = inject(Store);
  private destroyRef = inject(DestroyRef)
  private dialog = inject(MatDialog);
  private toasterService = inject(ToasterService);

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
    this.store.dispatch(JobActions.loadJobsAction({ page: 1, perPage: this.perPage }));
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
    console.log(event);
    this.perPage = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.store.dispatch(JobActions.loadJobsAction({
      page: event.pageIndex + 1,
      perPage: event.pageSize
    }));
  }

  onAddJob(): void {
    const addJobRef = this.dialog.open(AddJobComponent);
    addJobRef.afterClosed()
      .pipe(
        filter(response => !!response)
      )
      .subscribe(this.handleNewJob);
  }

  //#endregion

  //#region Handlers

  private handleJobs = (jobs: JobAd[]): void => {
    this.jobs$.next(jobs);
  }

  private handlePaginator = (data: Pagination): void => {
    this.pagination$.next(data);
  }

  private handleNewJob = (): void => {
    this.store.dispatch(JobActions.loadJobsAction({ page: this.currentPage, perPage: this.perPage }));
    // TODO: When a job ad is published, an invoice should be created.
    this.toasterService.showSuccess('Job has been created successfully');
  }

  //#endregion
}
