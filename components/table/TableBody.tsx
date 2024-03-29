import * as React from 'react';
import { useAtom } from 'jotai';
import { FormattedDate, FormattedNumber, useIntl } from 'react-intl';

import { InvoiceStatus } from '@/types/index';
import { LinkButton } from '@/components/button';
import StatusBadge, { getBadgeText } from '@/components/statusBadge';

import ContactIcon from '@/icons/contact_icon.svg';
import EditIcon from '@/icons/edit_icon.svg';
import PdfIcon from '@/icons/pdf_icon.svg';
import { InvoiceRowAccordion } from './InvoiceRowAccordion';

import { invoicesAtom } from '@/store/store';
export const TableBody = React.memo(function TableBodyUI() {
  const [data] = useAtom(invoicesAtom);
  const intl = useIntl();

  return (
    <>
      <div role="presentation" className="hidden xl:block">
        {data.map(
          ({
            invoiceNumber,
            customerName,
            invoiceDate,
            dueDate,
            total,
            remaining,
            status,
          }) => {
            const badgeText = getBadgeText(intl, status, remaining);
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
                <span role="gridcell">
                  <FormattedDate value={new Date(invoiceDate)} />
                </span>
                <span role="gridcell">
                  <FormattedDate value={new Date(dueDate)} />
                </span>
                <span role="gridcell">
                  <FormattedNumber
                    value={total}
                    style="currency"
                    currency="SEK"
                  />
                </span>
                <span role="gridcell">
                  <StatusBadge status={status} text={badgeText} />
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

      <div className="xl:hidden grid gap-y-0 md:gap-y-2">
        {data.map((invoice) => {
          return (
            <InvoiceRowAccordion
              key={`${invoice.customerName + invoice.total + invoice.dueDate}`}
              {...invoice}
            />
          );
        })}
      </div>
    </>
  );
});
