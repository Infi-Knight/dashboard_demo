import * as React from 'react';
import * as faker from 'faker';
import matchSorter from 'match-sorter';

import { Invoice, InvoiceStatus } from '@/types/index';

import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
// faker.setLocale('sv');
// faker.seed(123);

// const range = (len: number): Array<any> => {
//   const arr = [];
//   for (let i = 0; i < len; i++) {
//     arr.push(i);
//   }
//   return arr;
// };

let temp = [
  {
    invoiceNumber: 1,
    customerName: 'Persson, Karlsson and Eriksson',
    invoiceDate: '2021-10-10T23:59:53.950Z',
    dueDate: '2022-09-10T23:22:07.189Z',
    total: 551.32,
    status: 3,
  },
  {
    invoiceNumber: 2,
    customerName: 'Persson, Eriksson and Eriksson',
    invoiceDate: '2021-03-23T02:10:26.533Z',
    dueDate: '2022-12-25T18:42:42.051Z',
    total: 410.92,
    status: 6,
  },
  {
    invoiceNumber: 3,
    customerName: 'Larsson, Eriksson and Andersson',
    invoiceDate: '2021-08-11T16:16:03.573Z',
    dueDate: '2022-05-28T04:07:52.391Z',
    total: 343.18,
    status: 5,
  },
  {
    invoiceNumber: 4,
    customerName: 'Persson - Nilsson',
    invoiceDate: '2021-07-25T17:19:27.254Z',
    dueDate: '2022-04-01T03:18:31.608Z',
    total: 59.67,
    status: 3,
  },
  {
    invoiceNumber: 5,
    customerName: 'Nilsson, Larsson and Persson',
    invoiceDate: '2021-05-16T04:43:08.686Z',
    dueDate: '2022-03-09T09:50:42.300Z',
    total: 440.26,
    status: 2,
  },
  {
    invoiceNumber: 6,
    customerName: 'Johansson Group',
    date: '2021-04-16T19:12:17.428Z',
    dueDate: '2022-07-14T22:01:37.507Z',
    total: 427.86,
    status: 3,
  },
  {
    invoiceNumber: 7,
    customerName: 'Karlsson - Svensson',
    invoiceDate: '2021-07-06T04:33:16.296Z',
    dueDate: '2022-09-23T05:26:45.499Z',
    total: 740.3,
    status: 5,
  },
  {
    invoiceNumber: 8,
    customerName: 'Nilsson - Persson',
    invoiceDate: '2021-08-02T12:27:28.734Z',
    dueDate: '2022-04-29T16:20:15.044Z',
    total: 654.72,
    status: 5,
  },
  {
    invoiceNumber: 9,
    customerName: 'Nilsson - Karlsson',
    invoiceDate: '2021-10-08T04:53:03.464Z',
    dueDate: '2022-04-19T00:09:08.855Z',
    total: 988.0,
    status: 5,
  },
  {
    invoiceNumber: 10,
    customerName: 'Persson - Johansson',
    invoiceDate: '2021-03-24T04:39:30.064Z',
    dueDate: '2022-06-09T02:26:22.948Z',
    total: 27.98,
    status: 1,
  },
];
const Table = React.memo(function Table() {
  const data = React.useMemo(
    () =>
      temp.map(
        (item) =>
          ({
            ...item,
            id: item.invoiceNumber,
            remainig: item.total,
            invoiceDate: new Date(),
            dueDate: new Date(),
          } as unknown)
      ) as Invoice[],
    []
  );

  // // NOTE: If faker is used to dynamically generate data on client then next will complain about
  // // data being inconsistent between client and server generated data and may produce invlaid UI
  // // for e.g in this case if you uncomment these lines to generate data, the svg icons start looking
  // // distorted.
  // const data = React.useMemo(() => {
  //   return range(10).map((_, index) => {
  //     return {
  //       invoiceNumber: index + 1,
  //       customerName: faker.company.companyName(),
  //       // date: new Intl.DateTimeFormat('en-US').format(faker.date.past()),
  //       // dueDate: new Intl.DateTimeFormat('en-US').format(faker.date.future()),
  //       date: faker.date.past(),
  //       dueDate: faker.date.future(),
  //       total: faker.finance.total(),
  //       status:
  //         invoiceStatuses[Math.floor(Math.random() * invoiceStatuses.length)],
  //     };
  //   });
  // }, []);

  return (
    <section role="grid" className="bg-white border-0 lg:border lg:rounded">
      <TableHeader />
      <TableBody data={data} />
    </section>
  );
});

export default Table;
