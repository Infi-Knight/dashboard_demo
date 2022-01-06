import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import * as faker from 'faker';
import { Invoice } from '../../types';
import { invoiceStatuses } from '../../config';

faker.setLocale('sv');
faker.seed(123);

const clubs = ['AFC Eskilstuna', 'AIK Atlas', 'Adolfsbergs IK'];
const range = (len: number): Array<any> => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

export type InvoiceResponseType = {
  club: string;
  invoices: Invoice[];
}[];

const resData: InvoiceResponseType = clubs.map((club) => {
  let invoices: Invoice[] = range(100).map((_, index) => {
    return {
      invoiceNumber: index + 1,
      id: uuidv4(),
      customerName: faker.company.companyName(),
      dueDate: new Date(),
      invoiceDate: new Date(),
      total: parseFloat(faker.commerce.price()),
      remaining: parseFloat(faker.commerce.price()),
      status:
        invoiceStatuses[Math.floor(Math.random() * invoiceStatuses.length)],
    };
  });

  return {
    club,
    invoices,
  };
});

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<InvoiceResponseType>
) {
  res.status(200).json(resData);
}
