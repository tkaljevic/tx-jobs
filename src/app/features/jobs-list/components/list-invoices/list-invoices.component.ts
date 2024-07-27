import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { Invoice } from '@app-models';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import * as InvoiceActions from '../../../../core/store/actions/invoice.actions';
import * as InvoiceSelectors from '../../../../core/store/selectors/invoices.selectors';

@Component({
  selector: 'app-list-invoices',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
  ],
  templateUrl: './list-invoices.component.html',
  styleUrl: './list-invoices.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListInvoicesComponent implements OnInit {
  //#region Component props

  public data = inject(MAT_DIALOG_DATA);
  public invoices$ = new Subject<Invoice[]>();
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);

  //#endregion

  //#region Lifecycle Hooks

  ngOnInit(): void {
    this.initInvoices();
    this.initInvoicesSubscription();
  }

  //#endregion

  //#region Init

  private initInvoices(): void {
    this.store.dispatch(
      InvoiceActions.getInvoicesAction({ jobId: `${this.data.job.id}` })
    );
  }

  private initInvoicesSubscription(): void {
    this.store
      .select(InvoiceSelectors.invoicesSelector)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(this.handleInvoices.bind(this));
  }

  //#endregion

  //#region Invoices

  private handleInvoices(invoices: Invoice[]) {
    this.invoices$.next(invoices);
  }

  //#endregion
}
