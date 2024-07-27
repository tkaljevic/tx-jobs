import { inject, Injectable } from '@angular/core';
import { ToasterService } from '@core-services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { JobsHttpService } from '@shared-services';
import {
  catchError,
  concatMap,
  map,
  mergeMap,
  of,
  tap,
  withLatestFrom,
} from 'rxjs';
import * as JobActions from '../actions/job.actions';
import * as JobSelectors from '../selectors/job.selectors';

@Injectable()
export class JobEffects {
  private actions$ = inject(Actions);
  private jobsHttpService = inject(JobsHttpService);
  private toasterService = inject(ToasterService);
  private store = inject(Store);

  loadJobsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JobActions.loadJobsAction),
      mergeMap((action) =>
        this.jobsHttpService.getJobs(action.page, action.perPage).pipe(
          map((data) => JobActions.loadJobsSuccessAction({ data })),
          catchError((error) => {
            return of(
              JobActions.loadJobsFailureAction({ error: error.message })
            );
          })
        )
      )
    )
  );

  deleteJobsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JobActions.deleteJobAction),
      withLatestFrom(
        this.store.pipe(select(JobSelectors.currentPaginationSelector)),
        this.store.pipe(select(JobSelectors.jobsPaginationSelector))
      ),
      mergeMap(([action, pagination, metaPagination]) =>
        this.jobsHttpService.deleteJob(action.jobId).pipe(
          tap((deletedJob) =>
            this.toasterService.showSuccess(
              `Successfully deleted ${deletedJob.title}`
            )
          ),
          concatMap(() => {
            if (
              metaPagination.next === null &&
              metaPagination.items === pagination.perPage + 1
            ) {
              return [
                JobActions.setCurrentPagination({
                  page: pagination.page - 1,
                  perPage: pagination.perPage,
                }),
                JobActions.deleteJobSuccessAction(),
                JobActions.loadJobsAction({
                  page: pagination.page - 1,
                  perPage: pagination.perPage,
                }),
              ];
            }
            return [
              JobActions.deleteJobSuccessAction(),
              JobActions.loadJobsAction({
                page: pagination.page,
                perPage: pagination.perPage,
              }),
            ];
          }),
          catchError((error) =>
            of(JobActions.deleteJobFailureAction({ error: error.message }))
          )
        )
      )
    )
  );
}
