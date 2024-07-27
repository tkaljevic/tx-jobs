import { Injectable } from '@angular/core';
import { Invoice, InvoiceDto } from '@app-models';
import { CoreHttpService } from '@core-services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InvoiceHttpService extends CoreHttpService {
  /**
   * Create a new invoice.
   *
   * @param invoice Invoice to be saved
   * @returns Observable<InvoiceDto>
   */
  addInvoice(invoice: Omit<Invoice, 'id'>): Observable<InvoiceDto> {
    /**
     * AD:
     *
     * The "JobId" property has been introduced to enable the _dependent mode for job deletions.
     * As an alternative, we could use another NgRx action to delete the associated invoices.
     * However, since the mentioned approach (using actions) is already implemented,
     * the decision has been made to proceed with adding the "JobId" property as the final solution.
     */
    return this.post('invoices', { ...invoice, jobId: invoice.jobAdId });
  }

  /**
   * Get all invoices for the Job ID given.
   *
   * @param jobId Job containing related invoices
   * @returns Observable<InvoiceDto[]>
   */
  getInvoiceByJobId(jobId: string): Observable<InvoiceDto[]> {
    return this.get<InvoiceDto[]>(`invoices?jobAdId=${jobId}`);
  }
}
