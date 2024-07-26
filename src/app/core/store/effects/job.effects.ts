import { inject, Injectable } from '@angular/core';
import { CommonUtilityService, ToasterService } from '@core-services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { JobsHttpService } from '@shared-services';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as JobActions from '../actions/job.actions';

@Injectable()
export class JobEffects {
  private actions$ = inject(Actions);
  private jobsHttpService = inject(JobsHttpService);
  private toasterService = inject(ToasterService);
  private commonUtilityService = inject(CommonUtilityService);

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

  deleteJobEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JobActions.deleteJobAction),
      mergeMap((action) =>
        this.jobsHttpService.deleteJob(action.jobId).pipe(
          map((job) => {
            this.toasterService.showSuccess(
              `Job ${job.title} has been deleted`
            );
            this.commonUtilityService.jobDeleteConfirmation.next(job.id);
            return JobActions.deleteJobSuccessAction();
          }),
          catchError((error) => {
            return of(
              JobActions.deleteJobFailureAction({ error: error.message })
            );
          })
        )
      )
    )
  );
}
