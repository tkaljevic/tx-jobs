import { InvoiceState } from '@app-models';
import { createReducer, on } from '@ngrx/store';
import * as InvoiceActions from '../actions/invoice.actions';

export const initialState: InvoiceState = {
  data: [],
};

export const invoicesReducer = createReducer(
  initialState,
  on(InvoiceActions.getInvoicesSuccessAction, (state, action) => ({
    ...state,
    data: [...action.invoices],
  }))
);
