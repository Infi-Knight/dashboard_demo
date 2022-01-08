import { atom } from 'jotai';

import { Invoice, InvoiceStatus } from '@/types/invoice';
import { PaginationDataType } from '@/api/invoices';

export const clubsAtom = atom<string[]>([]);
export const searchAtom = atom('');
export const currentPageAtom = atom<number>(1);
export const filterTabOpenAtom = atom<boolean>(false);
export const appliedFiltersAtom = atom<InvoiceStatus[]>([]);
export const selectedFiltersAtom = atom<InvoiceStatus[]>([]);
export const selectedClubAtom = atom('');
export const invoicesAtom = atom<Invoice[]>([]);
export const paginationDataAtom = atom<PaginationDataType>(
  {} as PaginationDataType
);

// use this to create client side filtering, search etc
// export const filteredInvoicesAtom = atom((get) => {
//   const appliedFilters = get(appliedFiltersAtom);
//   if (appliedFilters.length > 0) {
//     const fetchedInvoices = get(invoicesAtom);
//     const invoicesWithFilters = fetchedInvoices.filter((invoice) =>
//       appliedFilters.includes(invoice.status)
//     );
//     return invoicesWithFilters;
//   } else return get(invoicesAtom);
// });
