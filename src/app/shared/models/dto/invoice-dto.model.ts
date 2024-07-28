import { Invoice } from './invoice.model';

export interface InvoiceDto extends Invoice {
  createdAt: string;
  updatedAt: string;
  _embedded: unknown;
}
