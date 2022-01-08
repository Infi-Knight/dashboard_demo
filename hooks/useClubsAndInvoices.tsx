import * as React from 'react';
import useSWR from 'swr';

import { InvoiceStatus } from '@/types/invoice';

async function fetcher(url: string) {
  const res = await fetch(url);
  return await res.json();
}

export function useClubs() {
  return useSWR('/api/clubs', fetcher);
}

export function useInvoicesForClub(
  club: string,
  currentPage: number,
  appliedFilters: InvoiceStatus[]
) {
  return useSWR(
    () =>
      club !== ''
        ? `/api/invoices?club=${club}&page=${currentPage}&filters=${appliedFilters.toString()}`
        : null,
    fetcher
  );
}
