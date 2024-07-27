import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { InvoiceHttpService } from '@shared-services';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as InvoiceActions from '../actions/invoice.actions';

@Injectable()
export class InvoiceEffects {
  private actions$ = inject(Actions);
  private invoiceHttpService = inject(InvoiceHttpService);

  createInvoiceEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.createInvoiceAction),
      mergeMap((action) =>
        this.invoiceHttpService.addInvoice(action.invoice).pipe(
          map(() => InvoiceActions.createInvoiceSuccessAction()),
          catchError((error) =>
            of(
              InvoiceActions.createInvoiceFailureAction({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );

  listInvoiceEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.getInvoicesAction),
      mergeMap((action) =>
        this.invoiceHttpService.getInvoiceByJobId(action.jobId).pipe(
          map((invoices) =>
            InvoiceActions.getInvoicesSuccessAction({ invoices })
          ),
          catchError((error) =>
            of(
              InvoiceActions.getInvoicesFailureAction({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );
}
