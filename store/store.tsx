import { atom } from 'jotai';

import { Invoice, InvoiceStatus } from '@/types/invoice';

export const clubsAtom = atom<string[]>([]);
export const filterTabOpenAtom = atom<boolean>(false);
export const appliedFiltersAtom = atom<InvoiceStatus[]>([]);
export const selectedFiltersAtom = atom<InvoiceStatus[]>([]);
export const selectedClubAtom = atom('');
export const invoicesAtom = atom<Invoice[]>([]);

export const filteredInvoicesAtom = atom((get) => {
  const appliedFilters = get(appliedFiltersAtom);
  if (appliedFilters.length > 0) {
    const fetchedInvoices = get(invoicesAtom);
    const invoicesWithFilters = fetchedInvoices.filter((invoice) =>
      appliedFilters.includes(invoice.status)
    );
    return invoicesWithFilters;
  } else return get(invoicesAtom);
});
