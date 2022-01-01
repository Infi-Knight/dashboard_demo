import * as React from 'react';
import * as faker from 'faker';
import matchSorter from 'match-sorter';

import { invoiceStatuses } from '@/config/index';
import { invoiceStatusUiData } from '@/components/filter/Filter';
import { InvoiceStatus } from '@/types/index';
import EditIcon from '@/icons/edit_icon.svg';
import PdfIcon from '@/icons/pdf_icon.svg';
import { LinkButton } from '@/components/button';
import { getCheckboxStyles } from '@/components/filter/utils';

// faker.setLocale('sv');
// faker.seed(123);

// const range = (len: number): Array<any> => {
//   const arr = [];
//   for (let i = 0; i < len; i++) {
//     arr.push(i);
//   }
//   return arr;
// };

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

let temp = [
  {
    serialNumber: 1,
    name: 'Persson, Karlsson and Eriksson',
    date: '2021-10-10T23:59:53.950Z',
    dueDate: '2022-09-10T23:22:07.189Z',
    amount: '551.32',
    status: 3,
  },
  {
    serialNumber: 2,
    name: 'Persson, Eriksson and Eriksson',
    date: '2021-03-23T02:10:26.533Z',
    dueDate: '2022-12-25T18:42:42.051Z',
    amount: '410.92',
    status: 6,
  },
  {
    serialNumber: 3,
    name: 'Larsson, Eriksson and Andersson',
    date: '2021-08-11T16:16:03.573Z',
    dueDate: '2022-05-28T04:07:52.391Z',
    amount: '343.18',
    status: 5,
  },
  {
    serialNumber: 4,
    name: 'Persson - Nilsson',
    date: '2021-07-25T17:19:27.254Z',
    dueDate: '2022-04-01T03:18:31.608Z',
    amount: '59.67',
    status: 3,
  },
  {
    serialNumber: 5,
    name: 'Nilsson, Larsson and Persson',
    date: '2021-05-16T04:43:08.686Z',
    dueDate: '2022-03-09T09:50:42.300Z',
    amount: '440.26',
    status: 2,
  },
  {
    serialNumber: 6,
    name: 'Johansson Group',
    date: '2021-04-16T19:12:17.428Z',
    dueDate: '2022-07-14T22:01:37.507Z',
    amount: '427.86',
    status: 3,
  },
  {
    serialNumber: 7,
    name: 'Karlsson - Svensson',
    date: '2021-07-06T04:33:16.296Z',
    dueDate: '2022-09-23T05:26:45.499Z',
    amount: '740.30',
    status: 5,
  },
  {
    serialNumber: 8,
    name: 'Nilsson - Persson',
    date: '2021-08-02T12:27:28.734Z',
    dueDate: '2022-04-29T16:20:15.044Z',
    amount: '654.72',
    status: 5,
  },
  {
    serialNumber: 9,
    name: 'Nilsson - Karlsson',
    date: '2021-10-08T04:53:03.464Z',
    dueDate: '2022-04-19T00:09:08.855Z',
    amount: '988.00',
    status: 5,
  },
  {
    serialNumber: 10,
    name: 'Persson - Johansson',
    date: '2021-03-24T04:39:30.064Z',
    dueDate: '2022-06-09T02:26:22.948Z',
    amount: '27.98',
    status: 1,
  },
];
const Table = React.memo(function Table() {
  const data = React.useMemo(
    () =>
      temp.map((item) => ({ ...item, date: new Date(), dueDate: new Date() })),
    []
  );

  // // NOTE: If faker is used to dynamically generate data on client then next will complain about
  // // data being inconsistent between client and server generated data and may produce invlaid UI
  // // for e.g in this case if you uncomment these lines to generate data, the svg icons start looking
  // // distorted.
  // const data = React.useMemo(() => {
  //   return range(10).map((_, index) => {
  //     return {
  //       serialNumber: index + 1,
  //       name: faker.company.companyName(),
  //       // date: new Intl.DateTimeFormat('en-US').format(faker.date.past()),
  //       // dueDate: new Intl.DateTimeFormat('en-US').format(faker.date.future()),
  //       date: faker.date.past(),
  //       dueDate: faker.date.future(),
  //       amount: faker.finance.amount(),
  //       status:
  //         invoiceStatuses[Math.floor(Math.random() * invoiceStatuses.length)],
  //     };
  //   });
  // }, []);

  // TODO: fix responsiveness for the table on > 1280px screens
  return (
    <section role="grid" className="bg-white border-0 lg:border lg:rounded">
      <div
        role="presentation"
        className="px-4 md:px-6 pt-3.5 pb-[0.9375rem] border-b border-gray-200"
      >
        <div
          role="row"
          className="font-semibold text-gray-800 grid grid-cols-[2rem_20rem_6rem_6rem_8rem_10rem_3.4375rem_3.4375rem] gap-x-6 font-sm"
        >
          <span role="columnheader">Nº</span>
          <span role="columnheader">Name</span>
          <span role="columnheader">Date</span>
          <span role="columnheader">Due date</span>
          <span role="columnheader">Amount</span>
          <span role="columnheader">Status</span>
          <span role="columnheader" className="justify-self-center">
            PDF
          </span>
          <span role="columnheader" className="justify-self-center">
            Edit
          </span>
        </div>
      </div>
      <div role="presentation">
        {data.map(({ serialNumber, name, date, dueDate, amount, status }) => {
          return (
            <div
              role="row"
              key={`${name + date + amount}`}
              className="grid items-center grid-cols-[2rem_20rem_6rem_6rem_8rem_10rem_3.4375rem_3.4375rem] gap-x-6 px-4 md:px-6 pt-3.5 pb-[0.9375rem] text-sm border-b border-gray-200"
            >
              <span role="gridcell">{serialNumber}</span>
              <span role="gridcell" className="font-medium">
                {name}
              </span>
              <span role="gridcell">{getFormattedDate(date)}</span>
              <span role="gridcell">{getFormattedDate(dueDate)}</span>
              <span role="gridcell">
                {currencyFormatter.format(parseFloat(amount))}
              </span>
              <span role="gridcell">
                <StatusBadge status={status} />
              </span>
              <span role="gridcell" className="justify-self-center">
                <LinkButton
                  className="pt-2 pb-2 pl-2 pr-2 bg-white border-0"
                  iconColor="text-primary-blue"
                  href="#"
                  Icon={PdfIcon}
                />
              </span>
              <span role="gridcell" className="justify-self-center">
                <LinkButton
                  className="pt-2 pb-2 pl-2 pr-2 bg-white border-0"
                  iconColor="text-primary-blue"
                  href="#"
                  Icon={EditIcon}
                />
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
});

const StatusBadge = React.memo(function StatusBadge({
  status,
}: {
  status: InvoiceStatus;
}) {
  const {
    statusName,
    icon: Icon,
    color,
  } = React.useMemo(
    () => invoiceStatusUiData[status],
    [status, invoiceStatusUiData]
  );
  const { labelBorder, labelBg, svgColor } = React.useMemo(
    () => getCheckboxStyles(color),
    [getCheckboxStyles, color]
  );

  const labelStyles = `select-none inline-flex items-center ${labelBg} p-1 pl-2.5 pr-3 border rounded-[20px] text-gray-800 cursor-pointer ${labelBorder}`;
  const iconStyles = `${svgColor} mr-2.5`;

  return (
    <div className={labelStyles}>
      <span className={iconStyles}>
        <Icon />
      </span>
      <span className="text-xs font-medium text-gray-800 font-montserrat">
        {statusName}
      </span>
    </div>
  );
});
export default Table;
