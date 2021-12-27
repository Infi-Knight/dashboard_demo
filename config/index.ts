import { InvoiceStatus } from '@/types/index';

export const invoiceStatuses: InvoiceStatus[] = [
  InvoiceStatus.Paid,
  InvoiceStatus.NotPaid,
  InvoiceStatus.Overdue,
  InvoiceStatus.Canceled,
  InvoiceStatus.Credited,
  InvoiceStatus.Overpaid,
  InvoiceStatus.PartlyPaid,
];
