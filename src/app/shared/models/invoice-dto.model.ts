import { Invoice } from './invoice.model';

export interface InvoiceDto extends Invoice {
  createdAt: Date;
  updatedAt: Date;
  _embedded: unknown;
}
