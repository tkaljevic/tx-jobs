import {
  JobAd,
  JobState,
  PaginatedResponse,
  ToasterMessage,
} from '@app-models';
import { createReducer, on } from '@ngrx/store';
import { getInvoicesFailureAction } from '../actions/invoice.actions';
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
  message: {} as ToasterMessage,
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
  })),
  on(JobActions.loadJobsFailureAction, (state, action) => ({
    ...state,
    message: {
      error: action.error,
      success: '',
      warning: '',
    },
  })),
  on(JobActions.setCurrentPagination, (state, action) => ({
    ...state,
    currentPagination: {
      page: action.page,
      perPage: action.perPage,
    },
  })),
  on(JobActions.setErrorMessage, (state, action) => ({
    ...state,
    message: {
      error: action.message,
      success: '',
      warning: '',
    },
  })),
  on(JobActions.deleteJobSuccessAction, (state) => ({
    ...state,
    message: {
      error: '',
      success: 'Successfully deleted job',
      warning: '',
    },
  })),
  on(JobActions.deleteJobFailureAction, (state, action) => ({
    ...state,
    message: {
      error: action.error,
      success: '',
      warning: '',
    },
  })),
  on(JobActions.addNewJobFailureAction, (state, action) => ({
    ...state,
    message: {
      error: action.error,
      success: '',
      warning: '',
    },
  })),
  on(JobActions.addJobSuccessAction, (state, action) => ({
    ...state,
    message: {
      error: '',
      warning: '',
      success: `${action.job.title} has been created`,
    },
  })),
  on(JobActions.updateJobStatusSuccessAction, (state) => ({
    ...state,
    message: {
      error: '',
      success: 'Job Successfully Updated',
      warning: '',
    },
  })),
  on(JobActions.updateJobStatusFailureAction, (state, action) => ({
    ...state,
    message: {
      error: action.error,
      success: '',
      warning: '',
    },
  })),
  on(getInvoicesFailureAction, (state, action) => ({
    ...state,
    message: {
      error: action.error,
      success: '',
      warning: '',
    },
  }))
);
