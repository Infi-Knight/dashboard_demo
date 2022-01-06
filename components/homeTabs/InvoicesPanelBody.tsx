import * as React from 'react';
import Table from '@/components/table';
import { Invoice } from '@/types/invoice';

type InvoicesPanelBodyProps = {
  invoices: Invoice[]
};
export const invoicesPanelBodyId = 'invoices-panel-body';
export const InvoicesPanelBody = React.memo(function InvoicesPanelBody({invoices}: InvoicesPanelBodyProps) {
  return (
    <>
      {/* this div makes space for filter tab when it is opened */}
      {/* this div's height is equal to the height of filter tab */}
      <div id="phantom-div" className="hidden md:block md:mt-4 lg:mt-6"></div>
      <div
        id={invoicesPanelBodyId}
        className="mx-auto mt-[6px] border-t border-gray-200 md:border-0 md:mt-8 max-w-screen-xl"
      >
        <Table invoices={invoices} />
      </div>
    </>
  );
});
