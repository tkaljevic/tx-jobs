import { JobAd, JobAdDto, PaginatedResponse } from '@app-models';
import { createAction, props } from '@ngrx/store';

export const loadJobsAction = createAction(
  '[Jobs] Load jobs',
  props<{ page: number; perPage: number }>()
);
export const loadJobsSuccessAction = createAction(
  '[Jobs] Load jobs success',
  props<{ data: PaginatedResponse<JobAdDto> }>()
);
export const loadJobsFailureAction = createAction(
  '[Jobs] Load jobs failure',
  props<{ error: string }>()
);

export const deleteJobAction = createAction(
  '[Jobs] Delete job',
  props<{ jobId: string }>()
);
export const deleteJobSuccessAction = createAction('[Jobs] Delete job success');

export const deleteJobFailureAction = createAction(
  '[Jobs] Delete job failure',
  props<{ error: string }>()
);

export const setCurrentPagination = createAction(
  '[Jobs] Set current pagination',
  props<{ page: number; perPage: number }>()
);

export const addNewJobAction = createAction(
  '[Jobs] Add new job',
  props<{ job: Partial<JobAd> }>()
);

export const addJobSuccessAction = createAction(
  '[Jobs] Add new job success',
  props<{ job: JobAd }>()
);

export const addNewJobFailureAction = createAction(
  '[Jobs] Add new job failure',
  props<{ error: string }>()
);

export const setErrorMessage = createAction(
  '[Toaster] Set error message',
  props<{ message: string }>()
);

export const setSuccessMessageAction = createAction(
  '[Toaster] Set success message',
  props<{ message: string }>()
);

export const updateJobStatusAction = createAction(
  '[Jobs] Update status',
  props<{ job: JobAd }>()
);

export const updateJobStatusSuccessAction = createAction(
  '[Jobs] Update status success'
);

export const updateJobStatusFailureAction = createAction(
  '[Jobs] Update status failure',
  props<{ error: string }>()
);
