import type { NextApiRequest, NextApiResponse } from 'next';
import { matchSorter } from 'match-sorter';
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

export type PaginationDataType = {
  total: number;
  perPageLimit: number;
  currentPage: number;
};
export type InvoiceResponseType = {
  invoices: Invoice[];
  paginationData: PaginationDataType;
};
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<InvoiceResponseType>
) {
  let { club, page, filters, searchString } = req.query as {
    club: string;
    page: string;
    filters: string[];
    searchString: string;
  };
  let invoices = clubToInvoices.get(club) || [];
  if (filters.length > 0) {
    invoices = invoices.filter((invoice) => {
      const invoiceStatus = invoice.status.toString();
      return filters.includes(invoiceStatus);
    });
  }
  invoices = matchSorter(invoices, searchString, {
    keys: ['customerName'],
  }).map((invoice, index) => ({
    ...invoice,
    invoiceNumber: index + 1,
  }));
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
