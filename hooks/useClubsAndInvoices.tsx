import * as React from 'react';
import useSWR from 'swr';

async function fetcher(url: string) {
  const res = await fetch(url);
  return await res.json();
}

export function useClubs() {
  return useSWR('/api/clubs', fetcher);
}

export function useInvoicesForClub(club: string) {
  return useSWR(() => club !== '' ? `/api/invoices?club=${club}` : null, fetcher);
}
