import { Invoice, InvoiceState } from '@app-models';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const invoicesFeatureSelector =
  createFeatureSelector<InvoiceState>('invoices');

export const invoicesSelector = createSelector(
  invoicesFeatureSelector,
  (state: InvoiceState): Invoice[] => state.data
);
