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

const Table = React.memo(function Table() {
  const data = React.useMemo(() => {
    return range(10).map((_, index) => {
      return {
        serialNumber: index + 1,
        name: faker.company.companyName(),
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
