import * as React from 'react';

import { Invoice } from '@/types/index';
import { LinkButton } from '@/components/button';
import StatusBadge from '@/components/statusBadge';

import ContactIcon from '@/icons/contact_icon.svg';
import EditIcon from '@/icons/edit_icon.svg';
import PdfIcon from '@/icons/pdf_icon.svg';

type TableBodyProps = {
  data: Invoice[];
};
export const TableBody = React.memo(function TableBodyUI({
  data,
}: TableBodyProps) {
  // TODO: fix responsiveness for the table on > 1280px screens. right now the width of each column
  // is hardcoded
  // One alternative is to use a html table based layout for desktop which will also preserve
  // the inbuilt a11y semantics. Nasty to style though
  return (
    <>
      <div role="hidden lg:block presentation">
        {data.map(
          ({
            invoiceNumber,
            customerName,
            invoiceDate,
            dueDate,
            total,
            status,
          }) => {
            return (
              <div
                role="row"
                key={`${customerName + invoiceDate + total}`}
                className="grid items-center grid-cols-[2rem_20rem_6rem_6rem_8rem_10rem_3.4375rem_3.4375rem] gap-x-6 px-4 md:px-6 pt-3.5 pb-[0.9375rem] text-sm border-b border-gray-200"
              >
                <span role="gridcell">{invoiceNumber}</span>
                <span role="gridcell" className="flex items-center font-medium">
                  <span className="p-[7.2px] bg-gray-100 border rounded border-gray-200 mr-6">
                    <ContactIcon />
                  </span>
                  {customerName}
                </span>
                <span role="gridcell">{getFormattedDate(invoiceDate)}</span>
                <span role="gridcell">{getFormattedDate(dueDate)}</span>
                <span role="gridcell">{getFormattedCurrency(total)}</span>
                <span role="gridcell">
                  <StatusBadge status={status} />
                </span>
                <span role="gridcell" className="justify-self-center">
                  <LinkButton
                    className="w-4 h-5 pt-0 pb-0 pl-0 pr-0 bg-white border-0"
                    iconClasses="text-primary-blue pt-0 pb-0 pl-0 pr-0"
                    href="#"
                    Icon={PdfIcon}
                  />
                </span>
                <span role="gridcell" className="justify-self-center">
                  <LinkButton
                    className="pt-0 pb-0 pl-0 pr-0 bg-white border-0 h-[1.125rem] w-[1.125rem]"
                    iconClasses="text-primary-blue pt-0 pb-0 pl-0 pr-0"
                    href="#"
                    Icon={EditIcon}
                  />
                </span>
              </div>
            );
          }
        )}
      </div>
    </>
  );
});

function getFormattedDate(date: Date) {
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
}
// TODO: initialise this only once, move to top context
function getFormattedCurrency(amount: number) {
  const currencyFormatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'SEK',
  });
  return currencyFormatter.format(amount);
}