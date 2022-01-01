import * as React from 'react';
import Link from 'next/link';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs';

import { ClubSelector } from '@/components/clubSelector';
import Search from '@/components/search';
import Filter from '@/components/filter';
import { LinkButton } from '@/components/button';

import { filterTabId } from '@/components/filter/Filter';

import NewInvoiceIcon from '@/icons/new_invoice_icon.svg';
import Table from '@/components/table';
// TODO: https://css-tricks.com/bold-on-hover-without-the-layout-shift/
// fix the shift due to font weight change on tab change
// TODO: fix margins on > 1280px
export const HomeTabs = (): JSX.Element => {
  return (
    <Tabs>
      {({ selectedIndex, focusedIndex }) => {
        let getTabStyle = (index: number) => {
          if (selectedIndex === index) {
            // active tab
            return `text-primary-blue font-bold border-b-4 border-primary-blue`;
          } else {
            return `text-gray-600 border-b-4 border-transparent`;
          }
        };
        return (
          <React.Fragment>
            <TabList className="mx-4 border-b border-gray-200 md:mx-6 lg:mx-12 bg-body">
              <Tab className={`px-2.5 py-4 ${getTabStyle(0)}`}>Invoices</Tab>
              <Tab className={`px-2.5 py-4 ${getTabStyle(1)}`}>Drafts</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <InvoicesPanelHeader />
                <InvoicesPanelBody />
              </TabPanel>

              <TabPanel>Coming soon...</TabPanel>
            </TabPanels>
          </React.Fragment>
        );
      }}
    </Tabs>
  );
};

const InvoicesPanelBody = React.memo(function InvoicesPanelBody() {
  return (
    <>
      {/* this div makes space for filter tab when it is opened */}
      {/* this div's height is equal to the height of filter tab */}
      <div id="phantom-div" className="hidden md:block md:mt-4 lg:mt-6"></div>
      <div className="mx-auto mt-0 border-t border-gray-200 md:border-0 md:mt-8 max-w-screen-xl">
        <Table />
      </div>
    </>
  );
});

const InvoicesPanelHeader = React.memo(function InvoicesPanelHeader() {
  const [isFilterTabOpen, setIsFilterTabOpen] = React.useState<boolean>(false);

  // TODO: clean up the code and fix any perf issues in this handler and associated useEffect down below
  const handlePhantomDivResize = () => {
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
  };
  // TODO: move this to a custom hook
  React.useEffect(() => {
    handlePhantomDivResize();
    window.addEventListener('resize', handlePhantomDivResize);
    return () => window.removeEventListener('resize', handlePhantomDivResize);
  }, [isFilterTabOpen, handlePhantomDivResize]);

  return (
    <div className="relative flex flex-wrap items-end mx-4 mt-6 md:mx-6 lg:mx-12 gap-4">
      <div className="order-4 w-full mt-4 md:order-1 md:basis-[530px] md:grow lg:basis-0">
        {/* this div makes space for filter tab when it is opened */}
        {/* this div's height is equal to the height of filter tab */}
        <div id="phantom-div-2" className="md:hidden"></div>
        <ClubSelector
          id="invoice"
          clubs={['AFC Eskilstuna', 'AIK Atlas', 'Adolfsbergs IK']}
          defaultClub="AFC Eskilstuna"
        />
      </div>

      <div className="order-3 md:order-4 lg:order-2">
        <Filter setIsFilterTabOpen={setIsFilterTabOpen} />
      </div>

      <div className="order-2 grow md:min-w-[351px] md:grow-0 md:order-3">
        <Search />
      </div>

      <div className="order-1 w-full md:order-2 md:w-auto lg:order-4">
        <Link href="#" passHref>
          <LinkButton Icon={NewInvoiceIcon}>New Invoice</LinkButton>
        </Link>
      </div>
    </div>
  );
});
