import { JobAdDto } from '@app-models';
import { createAction, props } from '@ngrx/store';

export const loadJobsAction = createAction('[Jobs] Load jobs', props<{ start: number, limit: number }>());
export const loadJobsSuccessAction = createAction('[Jobs] Load jobs success', props<{ jobs: JobAdDto[] }>());
export const loadJobsFailureAction = createAction('[Jobs] Load jobs failure', props<{ error: string }>());
