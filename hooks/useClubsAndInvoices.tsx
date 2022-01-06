import * as React from 'react';
import useSWR, { Key, Fetcher } from 'swr';
import { InvoiceResponseType } from '@/api/invoices';

const fetcher = (url: string): Promise<InvoiceResponseType> =>
  fetch(url).then((res) => res.json());

export function useClubsAndInvoices() {
  const { data, error } = useSWR('/api/invoices', fetcher);
  return {
    clubsAndInvoices: data,
    isLoading: !error && !data,
    isError: error,
  };
}
