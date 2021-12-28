import * as React from 'react';
import Link from 'next/link';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs';

import { ClubSelector } from '@/components/clubSelector';
import Search from '@/components/search';
import Filter from '@/components/filter';
import { LinkButton } from '@/components/button';

import NewInvoiceIcon from '@/icons/new_invoice_icon.svg';

// TODO: https://css-tricks.com/bold-on-hover-without-the-layout-shift/
// fix the shift due to font weight change on tab change
export const HomeTabs = (): JSX.Element => {
  const [isFilterTabOpen, setIsFilterTabOpen] = React.useState<boolean>(false);

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
            <TabList className="mx-4 border-b border-gray-200 bg-body">
              <Tab className={`px-2.5 py-4 ${getTabStyle(0)}`}>Invoices</Tab>
              <Tab className={`px-2.5 py-4 ${getTabStyle(1)}`}>Drafts</Tab>
            </TabList>

            <TabPanels>
              <TabPanel className="px-4">
                <div className="relative grid gap-x-6 items-end grid-cols-[1fr_auto_328px_auto] pt-9">
                  <ClubSelector
                    id="invoice"
                    clubs={['AFC Eskilstuna', 'AIK Atlas', 'Adolfsbergs IK']}
                    defaultClub="AFC Eskilstuna"
                  />
                  <Filter setIsFilterTabOpen={setIsFilterTabOpen} />
                  <Search />
                  <Link href="#" passHref>
                    <LinkButton Icon={NewInvoiceIcon}>New Invoice</LinkButton>
                  </Link>
                </div>
                {isFilterTabOpen && (
                  <div className="h-[278px] md:h-[246px] lg:[h-218px] mt-6"></div>
                )}
                <p className="mt-8 border border-gray-200 rounded">hello</p>
              </TabPanel>

              <TabPanel>Coming soon...</TabPanel>
            </TabPanels>
          </React.Fragment>
        );
      }}
    </Tabs>
  );
};
