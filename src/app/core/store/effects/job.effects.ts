import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { JobsHttpService } from "@shared-services";
import { catchError, map, mergeMap, of } from "rxjs";
import * as JobActions from '../actions/job.actions';


@Injectable()
export class JobEffects {

  private actions$ = inject(Actions);
  private jobsHttpService = inject(JobsHttpService);

  loadJobsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JobActions.loadJobsAction),
      mergeMap((action) => this.jobsHttpService
        .getJobs(action.page, action.perPage)
        .pipe(
          map(data => JobActions.loadJobsSuccessAction({ data })),
          catchError((error) => { return of(JobActions.loadJobsFailureAction({ error: error.message })) })
        )
      )
    )
  )
}
