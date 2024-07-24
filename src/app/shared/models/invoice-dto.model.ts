import { Invoice } from "./invoice.model";

interface InvoiceDto extends Invoice {
  createdAt: Date;
  updatedAt: Date;
  _embedded: unknown;
}
