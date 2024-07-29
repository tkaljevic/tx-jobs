import { Invoice } from '@app-models';
import { createAction, props } from '@ngrx/store';

export const createInvoiceAction = createAction(
  '[Invoice] Create',
  props<{ invoice: Omit<Invoice, 'id'> }>()
);

export const createInvoiceSuccessAction = createAction(
  '[Invoice] Create success'
);

export const createInvoiceFailureAction = createAction(
  '[Invoice] Create failure',
  props<{ error: string }>()
);

export const getInvoicesAction = createAction(
  '[Invoice] Get Invoices',
  props<{ jobId: string }>()
);

export const getInvoicesSuccessAction = createAction(
  '[Invoice] Get Invoices Success',
  props<{ invoices: Invoice[] }>()
);

export const getInvoicesFailureAction = createAction(
  '[Invoice] Get Invoices Failure',
  props<{ error: string }>()
);
