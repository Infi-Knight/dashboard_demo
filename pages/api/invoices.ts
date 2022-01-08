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

const MAX_INVOICES_PER_CLUB = 5;
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

export type InvoiceResponseType = Invoice[];
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<InvoiceResponseType>
) {
  const { club, page } = req.query as { club: string; page: string };
  console.log('club' + club);
  console.log('page' + page);
  const invoices = clubToInvoices.get(club) || [];

  res.status(200).json(invoices);
}
