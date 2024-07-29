import { InvoiceState } from './invoice-state.model';
import { JobState } from './job-state.model';

export interface AppState {
  jobs: JobState;
  invoices: InvoiceState;
}
