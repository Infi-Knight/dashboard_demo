import * as React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@reach/accordion';

import { Invoice } from '@/types/index';
import StatusBadge from '@/components/statusBadge';
import { getFormattedDate, getFormattedCurrency } from '@/utils/index';
import { LinkButton } from '@/components/button';

import EditIcon from '@/icons/edit_icon.svg';
import PdfIcon from '@/icons/pdf_icon.svg';
import ArrowUpIcon from '@/icons/arrow_up_icon.svg';
import ArrowDownIcon from '@/icons/arrow_down_icon.svg';

export const InvoiceRowAccordion = React.memo(function InvoiceRow({
  customerName,
  invoiceDate,
  total,
  status,
  dueDate,
}: Invoice) {
  const [isAccordionOpen, setIsAccordionOpen] = React.useState<boolean>(false);
  const handleAccordionToggle = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  const accordionClasses = isAccordionOpen
    ? 'bg-gray-50 md:bg-white'
    : 'border-b bg-white';

  return (
    <Accordion
      collapsible
      className={`p-4 border-gray-200 md:border md:rounded md:shadow-elevation-2 ${accordionClasses}`}
      onChange={handleAccordionToggle}
    >
      <AccordionItem>
        <AccordionButton as="div">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-x-12">
              <span className="font-medium text-gray-600">{customerName}</span>
              <div>
                <span className="mr-2 text-sm font-semibold text-gray-600">
                  Due date
                </span>
                <span className="text-sm text-gray-600">
                  {getFormattedDate(dueDate)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-x-6">
              <span className="justify-self-center">
                <StatusBadge status={status} />
              </span>
              <span className="justify-self-center">
                {isAccordionOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </span>
            </div>
          </div>
        </AccordionButton>
        <AccordionPanel className="mt-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col md:flex-row gap-x-12">
              <div>
                <span className="mr-2 text-sm font-semibold text-gray-600">
                  Invoice date
                </span>
                <span className="text-sm text-gray-600">
                  {getFormattedDate(invoiceDate)}
                </span>
              </div>
              <div>
                <span className="mr-2 text-sm font-semibold text-gray-600">
                  Amount
                </span>
                <span className="text-sm text-gray-600">
                  {getFormattedCurrency(total)}
                </span>
              </div>
            </div>
            <div className="flex gap-x-6 md:gap-x-8">
              <span>
                <LinkButton
                  className="w-4 h-5 pt-0 pb-0 pl-0 pr-0 bg-white border-0"
                  iconClasses="text-primary-blue pt-0 pb-0 pl-0 pr-0"
                  href="#"
                  Icon={PdfIcon}
                />
              </span>
              <span className="-mr-1">
                <LinkButton
                  className="pt-0 pb-0 pl-0 pr-0 bg-white border-0 h-[1.125rem] w-[1.125rem]"
                  iconClasses="text-primary-blue pt-0 pb-0 pl-0 pr-0"
                  href="#"
                  Icon={EditIcon}
                />
              </span>
            </div>
          </div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
});
