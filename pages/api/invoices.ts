import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import * as faker from 'faker';
import { clubs } from './clubs';
import { Invoice, InvoiceStatus } from '../../types';
import { invoiceStatuses } from '../../config';

faker.setLocale('sv');
faker.seed(123);

const range = (len: number): Array<any> => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const MAX_INVOICES_PER_CLUB = 55;
const LIMIT = 10;
let clubToInvoices = new Map<string, Invoice[]>();
for (const club of clubs) {
  const invoice = range(MAX_INVOICES_PER_CLUB).map((_, index) => {
    const status =
      invoiceStatuses[Math.floor(Math.random() * invoiceStatuses.length)];
    const total = parseFloat(faker.commerce.price());
    let remaining;
    if (status === InvoiceStatus.PartlyPaid) {
      remaining = 1 + Math.random() * total;
    } else {
      remaining = parseFloat(faker.commerce.price());
    }
    return {
      invoiceNumber: index + 1,
      id: uuidv4(),
      customerName: faker.company.companyName(),
      dueDate: new Date(),
      invoiceDate: new Date(),
      total: total,
      remaining: remaining,
      status: status,
    };
  });
  clubToInvoices.set(club, invoice);
}

export type InvoiceResponseType = {
  invoices: Invoice[];
  paginationData: {
    total: number;
    currentPage: number;
    perPageLimit: number;
  };
};
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<InvoiceResponseType>
) {
  let { club, page } = req.query as { club: string; page: string };
  if (page === undefined) page = '1';
  const invoices = clubToInvoices.get(club) || [];

  const totalInvoicesCount = invoices.length;
  const start = (parseInt(page) - 1) * LIMIT;

  const currentPageInvoices = invoices.slice(start, start + LIMIT);

  res.status(200).json({
    invoices: currentPageInvoices,
    paginationData: {
      total: totalInvoicesCount,
      currentPage: parseInt(page),
      perPageLimit: LIMIT,
    },
  });
}
