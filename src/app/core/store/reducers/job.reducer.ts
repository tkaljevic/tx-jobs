import { JobAd, JobState, PaginatedResponse } from '@app-models';
import { createReducer, on } from '@ngrx/store';
import * as JobActions from '../actions/job.actions';

export const initialState: JobState = {
  jobsData: {
    data: [],
    first: 1,
    items: 0,
    last: 1,
    next: null,
    pages: 1,
    prev: null,
  } as PaginatedResponse<JobAd>,
  error: '',
  currentPagination: {
    page: 1,
    perPage: 5,
  },
};

export const jobReducer = createReducer(
  initialState,
  on(JobActions.loadJobsSuccessAction, (state, { data }) => ({
    ...state,
    jobsData: data,
    error: '',
  })),
  on(JobActions.loadJobsFailureAction, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(JobActions.setCurrentPagination, (state, action) => ({
    ...state,
    currentPagination: {
      page: action.page,
      perPage: action.perPage,
    },
  }))
);
