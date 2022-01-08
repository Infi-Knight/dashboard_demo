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
} from '@/store/store';

import ArrowLeftIcon from '@/icons/arrow_left.svg';
import ArrowRightIcon from '@/icons/arrow_right.svg';

export const InvoicesPanel = () => {
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
      {invoices && (
        <div className="flex flex-col items-center pb-8 mt-4 mx-0 md:mx-6 lg:mx-12">
          <span className="self-end hidden text-xs text-gray-700 lg:block">
            Displaying 10 of 25 items
          </span>
          <div className="flex items-center justify-center mx-auto gap-[20.5px] mt-8 lg:mt-0">
            <Button
              variant="secondary"
              Icon={ArrowLeftIcon}
              disabled={true}
              iconClasses="text-gray-300"
            />
            <div className="flex items-center justify-center text-sm gap-[5px] font-semibold">
              <span className="flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-full cursor-pointer text-primary-blue lg:rounded">
                1
              </span>
              <span className="px-1 py-2 text-gray-600 cursor-pointer">2</span>
            </div>
            <Button
              iconClasses="text-gray-600"
              variant="secondary"
              Icon={ArrowRightIcon}
            />
          </div>
        </div>
      )}
    </>
  );
};
