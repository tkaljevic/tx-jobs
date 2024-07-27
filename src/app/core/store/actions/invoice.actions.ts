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
