import * as React from 'react';
import { useAtom } from 'jotai';

import { InvoicesPanelHeader } from './InvoicesPanelHeader';
import { InvoicesPanelBody } from './InvoicesPanelBody';
import { useClubs, useInvoicesForClub } from '@/hooks/useClubsAndInvoices';

import {
  clubsAtom,
  invoicesAtom,
  selectedClubAtom,
  invoicesErrorAtom,
  appliedFiltersAtom,
  selectedFiltersAtom,
  currentPageAtom,
  paginationDataAtom,
  searchAtom,
  clubsErrorAtom,
} from '@/store/store';

export const InvoicesPanel = () => {
  // TODO: use a reducer here to centralize the state?
  const [, setIsInvoicesLoadingFailed] = useAtom(invoicesErrorAtom);
  const [, setIsClubsLoadingFailed] = useAtom(clubsErrorAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [, setPaginationData] = useAtom(paginationDataAtom);
  const [clubs, setClubs] = useAtom(clubsAtom);
  const [searchString, setSearchString] = useAtom(searchAtom);
  const [selectedClub, setSelectedClub] = useAtom(selectedClubAtom);
  const [, setInvoices] = useAtom(invoicesAtom);
  const [appliedFilters, setAppliedFilters] = useAtom(appliedFiltersAtom);
  const [, setSelectedFilters] = useAtom(selectedFiltersAtom);

  const { data: clubsData, error: clubsDataError } = useClubs();
  React.useEffect(() => {
    if (clubsDataError) {
      setIsClubsLoadingFailed(true)
    } else {
      setIsClubsLoadingFailed(false)
    }
  }, [clubsDataError, setIsClubsLoadingFailed]);
  React.useEffect(() => {
    if (clubsData) {
      setClubs(clubsData);
      setSelectedClub(clubs[0]);
    }
  }, [clubs, clubsData, setClubs, setSelectedClub]);

  const { data: invoicesData, error: invoicesDataError } = useInvoicesForClub(
    selectedClub,
    currentPage,
    appliedFilters,
    searchString
  );
  React.useEffect(() => {
    if (invoicesDataError) {
      setIsInvoicesLoadingFailed(true)
    } else {
      setIsInvoicesLoadingFailed(false)
    }
  }, [invoicesDataError, setIsInvoicesLoadingFailed]);

  React.useEffect(() => {
    if (invoicesData) {
      setInvoices(invoicesData.invoices);
      setPaginationData(invoicesData.paginationData);
    }
  }, [selectedClub, invoicesData, setInvoices, currentPage, setPaginationData]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [appliedFilters, setCurrentPage]);

  React.useEffect(() => {
    // reset filters and search string on club change and take to page 1
    setCurrentPage(1);
    setSelectedFilters([]);
    setAppliedFilters([]);
    setSearchString('');
  }, [
    selectedClub,
    setAppliedFilters,
    setCurrentPage,
    setSearchString,
    setSelectedFilters,
  ]);

  return (
    <>
      <InvoicesPanelHeader />
      {/* Error banner e.g on network failure */}
      {(invoicesDataError || clubsDataError) && (
        <div className="mx-0 md:mx-6 lg:mx-12 md:mt-8 grid place-content-center text-rose-500">
          Something went wrong...
        </div>
      )}
      {/* Loading skeleton */}
      {!invoicesData && !invoicesDataError && (
        <div className="flex flex-col mx-0 animate-pulse gap-y-10 md:mx-6 lg:mx-12 md:mt-8">
          {Array(7)
            .fill(0)
            .map((_, index) => {
              return <div key={index} className="h-10 bg-gray-200 "></div>;
            })}
        </div>
      )}
      {invoicesData && !invoicesDataError && <InvoicesPanelBody />}
    </>
  );
};
