import * as React from 'react';
import { useAtom } from 'jotai';

import Table from '@/components/table';

import { filteredInvoicesAtom } from 'store/store';

export const invoicesPanelBodyId = 'invoices-panel-body';
export const InvoicesPanelBody = () => {
  const [filteredInvoices] = useAtom(filteredInvoicesAtom);

  return (
    <>
      {/* this div makes space for filter tab when it is opened */}
      {/* this div's height is equal to the height of filter tab */}
      <div id="phantom-div" className="hidden md:block md:mt-4 lg:mt-6"></div>
      <div
        id={invoicesPanelBodyId}
        className="mx-auto mt-[6px] border-t border-gray-200 md:border-0 md:mt-8 max-w-screen-xl"
      >
        <Table invoices={filteredInvoices} />
      </div>
    </>
  );
};
