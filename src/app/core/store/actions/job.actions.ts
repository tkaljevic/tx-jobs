import { JobAdDto, PaginatedResponse } from '@app-models';
import { createAction, props } from '@ngrx/store';

export const loadJobsAction = createAction('[Jobs] Load jobs', props<{ page: number, perPage: number }>());
export const loadJobsSuccessAction = createAction('[Jobs] Load jobs success', props<{ data: PaginatedResponse<JobAdDto> }>());
export const loadJobsFailureAction = createAction('[Jobs] Load jobs failure', props<{ error: string }>());
