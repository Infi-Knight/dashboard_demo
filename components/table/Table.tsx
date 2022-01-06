import * as React from 'react';
import matchSorter from 'match-sorter';

import { Invoice } from '@/types/invoice';

import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';

type TableProps = {
  invoices: Invoice[];
};
const Table = React.memo(function Table({ invoices }: TableProps) {
  return (
    <section
      role="grid"
      className="mx-0 bg-white border-0 lg:border lg:rounded md:mx-6 lg:mx-12"
    >
      <TableHeader />
      <TableBody data={invoices} />
    </section>
  );
});

export default Table;
