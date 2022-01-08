import * as React from 'react';
import { useAtom } from 'jotai';

import { InvoicesPanelHeader } from './InvoicesPanelHeader';
import { InvoicesPanelBody } from './InvoicesPanelBody';
import { useClubs, useInvoicesForClub } from '@/hooks/useClubsAndInvoices';

import {
  clubsAtom,
  invoicesAtom,
  selectedClubAtom,
  appliedFiltersAtom,
  selectedFiltersAtom,
} from '@/store/store';

export const InvoicesPanel = () => {
  const [clubs, setClubs] = useAtom(clubsAtom);
  const [selectedClub, setSelectedClub] = useAtom(selectedClubAtom);
  const [invoices, setInvoices] = useAtom(invoicesAtom);
  const [appliedFilters, setAppliedFilters] = useAtom(appliedFiltersAtom);
  const [selectedFilters, setSelectedFilters] = useAtom(selectedFiltersAtom);

  const { data: clubsData } = useClubs();
  React.useEffect(() => {
    if (clubsData) {
      setClubs(clubsData);
      setSelectedClub(clubs[0]);
    }
  }, [clubs, clubsData, setClubs, setSelectedClub]);

  const { data: invoicesData } = useInvoicesForClub(selectedClub);
  React.useEffect(() => {
    if (invoicesData) {
      setInvoices(invoicesData);
      // filters should reset on invoices change
      setSelectedFilters([]);
      setAppliedFilters([]);
    }
  }, [invoicesData, setInvoices]);

  return (
    <>
      {selectedClub && <InvoicesPanelHeader />}
      {invoices && <InvoicesPanelBody />}
    </>
  );
};
