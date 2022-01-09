import { InvoiceStatus } from '@/types/index';

export const invoiceStatuses: InvoiceStatus[] = [
  InvoiceStatus.NotPaid,
  InvoiceStatus.Overdue,
  InvoiceStatus.PartlyPaid,
  InvoiceStatus.Paid,
  InvoiceStatus.Overpaid,
  InvoiceStatus.Credited,
  InvoiceStatus.Canceled,
];

export const defaultLocale = 'sv-SE'