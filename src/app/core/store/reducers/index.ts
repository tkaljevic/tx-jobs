import { AppState } from '@app-models';
import { ActionReducerMap } from '@ngrx/store';
import { invoicesReducer } from './invoices.reducer';
import { jobReducer } from './job.reducer';

export const reducers: ActionReducerMap<AppState> = {
  jobs: jobReducer,
  invoices: invoicesReducer,
};
