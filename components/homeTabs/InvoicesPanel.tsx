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
  currentPageAtom,
  paginationDataAtom,
} from '@/store/store';

export const InvoicesPanel = () => {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [, setPaginationData] = useAtom(paginationDataAtom);
  const [clubs, setClubs] = useAtom(clubsAtom);
  const [selectedClub, setSelectedClub] = useAtom(selectedClubAtom);
  const [invoices, setInvoices] = useAtom(invoicesAtom);
  const [appliedFilters, setAppliedFilters] = useAtom(appliedFiltersAtom);
  const [, setSelectedFilters] = useAtom(selectedFiltersAtom);

  const { data: clubsData } = useClubs();
  React.useEffect(() => {
    if (clubsData) {
      setClubs(clubsData);
      setSelectedClub(clubs[0]);
    }
  }, [clubs, clubsData, setClubs, setSelectedClub]);

  const { data: invoicesData } = useInvoicesForClub(
    selectedClub,
    currentPage,
    appliedFilters
  );
  React.useEffect(() => {
    if (invoicesData) {
      setInvoices(invoicesData.invoices);
      setPaginationData(invoicesData.paginationData);
    }
  }, [selectedClub, invoicesData, setInvoices, currentPage, setPaginationData]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [appliedFilters]);

  React.useEffect(() => {
    // reset filters on club change and take to page 1
    setCurrentPage(1);
    setSelectedFilters([]);
    setAppliedFilters([]);
  }, [selectedClub, setAppliedFilters, setCurrentPage, setSelectedFilters]);

  return (
    <>
      {selectedClub && <InvoicesPanelHeader />}
      {invoices && <InvoicesPanelBody />}
    </>
  );
};
