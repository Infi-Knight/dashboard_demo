import * as React from 'react';
import Link from 'next/link';
import { useAtom } from 'jotai';

import ClubSelector from '@/components/clubSelector';
import Filter from '@/components/filter';
import Search from '@/components/search';
import { filterTabId } from '@/components/filter/Filter';
import { LinkButton } from '@/components/button';
import { AppliedFilters } from './AppliedFilters';

import { appliedFiltersAtom, filterTabOpenAtom } from '@/store/store';

import NewInvoiceIcon from '@/icons/new_invoice_icon.svg';
import { invoicesPanelBodyId } from './InvoicesPanelBody';

export const InvoicesPanelHeader = React.memo(function InvoicesPanelHeader() {
  const [appliedFilters] = useAtom(appliedFiltersAtom);
  const [isFilterTabOpen, setIsFilterTabOpen] = useAtom(filterTabOpenAtom);

  // TODO: clean up the code and fix any perf issues in this handler and associated useEffect down below
  const handlePhantomDivResize = React.useCallback(() => {
    // Filter tab is positioned absolutely. So when it opens we need to move the
    // invoice table by the same amount otherwise this tab will appear over the table.
    // to fix this we create a ghost div whose only job is to take as much space as required
    // by the filter tab.
    // NOTE: down in the div, we are using the style prop to set height instead of tailwind class
    // this is because tailwind needs to know beforehand the actual class name somewhere in code
    // which in our case won't be available as the filter tab's height may vary and it won't make sense
    // to hardcode some pixels!
    const filterTab = document.querySelector(
      `#panel--${filterTabId}`
    ) as HTMLDivElement;
    const phantomDivTabletAndDesktop = document.querySelector(
      `#phantom-div`
    ) as HTMLDivElement;
    const phantomDivMobile = document.querySelector(
      `#phantom-div-2`
    ) as HTMLDivElement;

    if (isFilterTabOpen && filterTab !== null) {
      const filterTabHeight = filterTab.offsetHeight;
      if (phantomDivTabletAndDesktop !== null) {
        phantomDivTabletAndDesktop.style.height = `${filterTabHeight}px`;
      }
      if (phantomDivMobile !== null) {
        phantomDivMobile.style.height = `${filterTabHeight}px`;
        phantomDivMobile.style.marginBottom = `2rem`;
      }
    } else {
      if (phantomDivTabletAndDesktop !== null) {
        phantomDivTabletAndDesktop.style.height = `0px`;
      }
      if (phantomDivMobile !== null) {
        phantomDivMobile.style.height = `0px`;
        phantomDivMobile.style.marginBottom = `0px`;
      }
    }
  }, [isFilterTabOpen]);

  const handleInvoicesBodyOpacityOnFilterOpen = React.useCallback(() => {
    const invoicesPanelBody = document.querySelector(
      `#${invoicesPanelBodyId}`
    ) as HTMLDivElement;
    if (invoicesPanelBody !== null) {
      if (isFilterTabOpen) {
        invoicesPanelBody.style.opacity = '0.5';
      } else {
        invoicesPanelBody.style.opacity = '1';
      }
    }
  }, [isFilterTabOpen]);

  // TODO: move this to a custom hook
  React.useEffect(() => {
    handleInvoicesBodyOpacityOnFilterOpen();
    handlePhantomDivResize();
    window.addEventListener('resize', handlePhantomDivResize);
    return () => window.removeEventListener('resize', handlePhantomDivResize);
  }, [
    isFilterTabOpen,
    handlePhantomDivResize,
    handleInvoicesBodyOpacityOnFilterOpen,
  ]);

  const invoiceButtonClasses = isFilterTabOpen
    ? 'bg-gray-200 text-gray-400'
    : '';

  return (
    <div className="relative flex flex-wrap items-end mx-4 mt-6 md:mx-6 lg:mx-12 gap-4 max-w-screen-xl">
      <div className="order-5 w-full mt-4 md:order-1 md:basis-[530px] md:grow lg:basis-0">
        {/* this div makes space for filter tab when it is opened */}
        {/* this div's height is equal to the height of filter tab */}
        <div id="phantom-div-2" className="md:hidden"></div>
        <ClubSelector id="invoice" />
      </div>

      <div className="order-3 md:order-4 lg:order-2">
        <Filter setIsFilterTabOpen={setIsFilterTabOpen} />
      </div>

      {appliedFilters.length > 0 && !isFilterTabOpen && (
        <div className="order-4 w-full md:order-5 lg:pt-2">
          <AppliedFilters />
        </div>
      )}

      <div className="order-2 grow md:min-w-[351px] md:grow-0 md:order-3">
        <Search />
      </div>

      <div className="order-1 w-full md:order-2 md:w-auto lg:order-4">
        <Link href="#" passHref>
          <LinkButton className={invoiceButtonClasses} Icon={NewInvoiceIcon}>
            New Invoice
          </LinkButton>
        </Link>
      </div>
    </div>
  );
});
