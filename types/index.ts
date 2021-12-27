export enum InvoiceStatus {
  NotPaid = 1,
  Overdue,
  PartlyPaid,
  Paid,
  Overpaid,
  Credited,
  Canceled,
}

export type Invoice = {
  id: string;
  invoiceNumber: number;
  customerName: string;
  invoiceDate: Date;
  dueDate: Date;
  total: number;
  remaining: number;
  status: InvoiceStatus;
};

export enum UiColors {
  RED = 'red',
  AMBER = 'amber',
  VIOLET = 'violet',
  BLUE = 'blue',
  EMERALD = 'emerald',
}
