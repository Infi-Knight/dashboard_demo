import * as React from 'react';
import * as faker from 'faker';
import matchSorter from 'match-sorter';

import { invoiceStatuses } from '@/config/index';
import { invoiceStatusUiData } from '@/components/filter/Filter';
import { InvoiceStatus } from '../../types';

faker.setLocale('sv');
const range = (len: number): Array<any> => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

type TableDataType = {
  serialNumber: number;
  name: string;
  date: Date;
  dueDate: Date;
  amount: string;
  status: InvoiceStatus;
};

const getFormattedDate = (date: Date) => {
  const dateFormatter = new Intl.DateTimeFormat('sv-SE', {
    dateStyle: 'short',
  });

  return dateFormatter
    .formatToParts(date)
    .map(({ type, value }) => {
      switch (type) {
        case 'literal':
          return `/`;
        default:
          return value;
      }
    })
    .join('');
};
// TODO: initialise this only once, move to top context
const currencyFormatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'SEK',
});
const Table = (): JSX.Element => {
  const data = React.useMemo(() => {
    return range(100).map((_, index) => {
      return {
        serialNumber: index + 1,
        name: faker.name.findName(),
        // date: new Intl.DateTimeFormat('en-US').format(faker.date.past()),
        // dueDate: new Intl.DateTimeFormat('en-US').format(faker.date.future()),
        date: faker.date.past(),
        dueDate: faker.date.future(),
        amount: faker.finance.amount(),
        status:
          invoiceStatuses[Math.floor(Math.random() * invoiceStatuses.length)],
      };
    });
  }, []);

  return (
    <section role="grid" className="bg-white border-0 lg:border lg:rounded">
      <div
        role="presentation"
        className="px-4 md:px-6 pt-3.5 pb-[0.9375rem] border-b border-gray-200"
      >
        <div
          role="row"
          className="font-semibold text-gray-800 grid grid-cols-8 gap-x-6 font-sm"
        >
          <span role="columnheader">Nº</span>
          <span role="columnheader">Name</span>
          <span role="columnheader">Date</span>
          <span role="columnheader">Due date</span>
          <span role="columnheader">Amount</span>
          <span role="columnheader">Status</span>
          <span role="columnheader">PDF</span>
          <span role="columnheader">Edit</span>
        </div>
      </div>
      <div role="presentation">
        {data.map(({ serialNumber, name, date, dueDate, amount, status }) => {
          return (
            <div
              role="row"
              key={`${name + date + amount}`}
              className="grid grid-cols-8 gap-x-6 px-4 md:px-6 pt-3.5 pb-[0.9375rem] text-sm border-b border-gray-200"
            >
              <span role="gridcell">{serialNumber}</span>
              <span role="gridcell" className="font-medium">
                {name}
              </span>
              <span role="gridcell">
                {currencyFormatter.format(parseFloat(amount))}
              </span>
              <span role="gridcell">{getFormattedDate(date)}</span>
              <span role="gridcell">
                {currencyFormatter.format(parseFloat(amount))}
              </span>
              <span role="gridcell">{status}</span>
              <span role="gridcell">pdf</span>
              <span role="gridcell">edit</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Table;
