import { JobAd, JobState, PaginatedResponse } from "@app-models";
import { createReducer, on } from "@ngrx/store";
import * as JobActions from '../actions/job.actions';

export const initialState: JobState = {
  jobsData: {
    data: [],
    first: 1,
    items: 0,
    last: 1,
    next: 1,
    pages: 5,
    prev: null
  } as PaginatedResponse<JobAd>,
  error: '',
}

export const jobReducer = createReducer(
  initialState,
  on(JobActions.loadJobsSuccessAction, (state, { data }) => ({
    ...state,
    jobsData: data,
    error: ''
  })),
  on(JobActions.loadJobsFailureAction, (state, { error }) => ({
    ...state,
    error: error,
  }))
)
