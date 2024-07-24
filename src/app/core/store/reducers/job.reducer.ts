import { JobState } from "@app-models";
import { createReducer, on } from "@ngrx/store";
import * as JobActions from '../actions/job.actions';

export const initialState: JobState = {
  jobs: [],
  error: '',
}

export const jobReducer = createReducer(
  initialState,
  on(JobActions.loadJobsSuccessAction, (state, { jobs }) => ({
    ...state,
    jobs: jobs,
    error: ''
  })),
  on(JobActions.loadJobsFailureAction, (state, { error }) => ({
    ...state,
    error: error,
  }))
)
