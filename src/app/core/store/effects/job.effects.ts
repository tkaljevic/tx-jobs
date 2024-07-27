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
        this.store.pipe(select(JobSelectors.currentPaginationSelector))
      ),
      mergeMap(([action, pagination]) =>
        this.jobsHttpService.deleteJob(action.jobId).pipe(
          tap((deletedJob) =>
            this.toasterService.showSuccess(
              `Successfully deleted ${deletedJob.title}`
            )
          ),
          concatMap(() => [
            JobActions.deleteJobSuccessAction(),
            JobActions.loadJobsAction({
              page: pagination.page,
              perPage: pagination.perPage,
            }),
          ]),
          catchError((error) =>
            of(JobActions.deleteJobFailureAction({ error: error.message }))
          )
        )
      )
    )
  );
}
