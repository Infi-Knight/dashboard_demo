import * as React from 'react';
import { useAtom } from 'jotai';

import { Button } from '@/components/button';
import { InvoicesPanelHeader } from './InvoicesPanelHeader';
import { InvoicesPanelBody } from './InvoicesPanelBody';
import { useClubs, useInvoicesForClub } from '@/hooks/useClubsAndInvoices';

import {
  clubsAtom,
  invoicesAtom,
  selectedClubAtom,
  appliedFiltersAtom,
  selectedFiltersAtom,
  currentPageAtom,
  paginationDataAtom,
} from '@/store/store';

import ArrowLeftIcon from '@/icons/arrow_left.svg';
import ArrowRightIcon from '@/icons/arrow_right.svg';

export const InvoicesPanel = () => {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [paginationData, setPaginationData] = useAtom(paginationDataAtom);
  const [clubs, setClubs] = useAtom(clubsAtom);
  const [selectedClub, setSelectedClub] = useAtom(selectedClubAtom);
  const [invoices, setInvoices] = useAtom(invoicesAtom);
  const [, setAppliedFilters] = useAtom(appliedFiltersAtom);
  const [, setSelectedFilters] = useAtom(selectedFiltersAtom);

  const { data: clubsData } = useClubs();
  React.useEffect(() => {
    if (clubsData) {
      setClubs(clubsData);
      setSelectedClub(clubs[0]);
    }
  }, [clubs, clubsData, setClubs, setSelectedClub]);

  const { data: invoicesData, error: invoicesError } = useInvoicesForClub(
    selectedClub,
    currentPage
  );
  React.useEffect(() => {
    if (invoicesData) {
      setInvoices(invoicesData.invoices);
      setPaginationData(invoicesData.paginationData);
      // filters should reset on invoices change
      setSelectedFilters([]);
      setAppliedFilters([]);
    }
  }, [invoicesData, setInvoices, currentPage]);

  return (
    <>
      {selectedClub && <InvoicesPanelHeader />}
      {invoices && <InvoicesPanelBody />}
    </>
  );
};
