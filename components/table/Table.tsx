import * as React from 'react';

import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';

const Table = React.memo(function Table() {
  return (
    <section
      role="grid"
      className="mx-0 bg-white border-0 lg:border lg:rounded md:mx-6 lg:mx-12"
    >
      <TableHeader />
      <TableBody />
    </section>
  );
});

export default Table;
