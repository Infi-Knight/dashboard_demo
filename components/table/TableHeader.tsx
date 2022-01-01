import * as React from 'react';

export const TableHeader = React.memo(function TableHeaderUI() {
  return (
    <div
      role="presentation"
      className="hidden lg:block px-4 md:px-6 pt-3.5 pb-[0.9375rem] border-b border-gray-200"
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
  );
});
