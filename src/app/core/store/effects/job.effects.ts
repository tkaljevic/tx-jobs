import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { JobsHttpService } from '@shared-services';
import { catchError, concatMap, map, mergeMap, of, withLatestFrom } from 'rxjs';
import * as JobActions from '../actions/job.actions';
import * as JobSelectors from '../selectors/job.selectors';

@Injectable()
export class JobEffects {
  private actions$ = inject(Actions);
  private jobsHttpService = inject(JobsHttpService);
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

  addNewJobEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JobActions.addNewJobAction),
      withLatestFrom(
        this.store.pipe(select(JobSelectors.currentPaginationSelector))
      ),
      mergeMap(([action, pagination]) =>
        this.jobsHttpService.addJob(action.job).pipe(
          concatMap((job) => {
            // TODO: Invoice add?
            return [
              JobActions.addJobSuccessAction({ job }),
              JobActions.loadJobsAction({
                page: pagination.page,
                perPage: pagination.perPage,
              }),
            ];
          }),
          catchError((error) => {
            return of(
              JobActions.addNewJobFailureAction({ error: error.message })
            );
          })
        )
      )
    )
  );
}
