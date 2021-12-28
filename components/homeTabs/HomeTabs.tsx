import * as React from 'react';
import Link from 'next/link';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs';

import { ClubSelector } from '@/components/clubSelector';
import Search from '@/components/search';
import Filter from '@/components/filter';
import { LinkButton } from '@/components/button';

import { filterTabId } from '@/components/filter/Filter';

import NewInvoiceIcon from '@/icons/new_invoice_icon.svg';

// TODO: https://css-tricks.com/bold-on-hover-without-the-layout-shift/
// fix the shift due to font weight change on tab change
export const HomeTabs = (): JSX.Element => {
  const [isFilterTabOpen, setIsFilterTabOpen] = React.useState<boolean>(false);
  const [phantomDivHeight, setPhantomDivHeight] = React.useState(0);

  // TODO: move this to a custom hook
  React.useLayoutEffect(() => {
    // Filter tab is positioned absolutely. So when it opens we need to move the
    // invoice table by the same amount otherwise this tab will appear over the table.
    // to fix this we create a ghost div whose only job is to take as much space as required
    // by the filter tab.
    // NOTE: down in the div, we are using the style prop to set height instead of tailwind class
    // this is because tailwind needs to know beforehand the actual class name somewhere in code
    // which in our case won't be available as the filter tab's height may vary and it won't make sense
    // to hardcode some pixels!
    if (isFilterTabOpen) {
      const filterTab = document.querySelector(
        `#panel--${filterTabId}`
      ) as HTMLDivElement;
      if (filterTab !== null) {
        setPhantomDivHeight(filterTab.offsetHeight);
      }
    } else {
      setPhantomDivHeight(0);
    }
  }, [isFilterTabOpen]);

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
            <TabList className="border-b border-gray-200 bg-body">
              <Tab className={`px-2.5 py-4 ${getTabStyle(0)}`}>Invoices</Tab>
              <Tab className={`px-2.5 py-4 ${getTabStyle(1)}`}>Drafts</Tab>
            </TabList>

            <TabPanels>
              <TabPanel className="grid gap-y-6">
                <div className="relative flex flex-wrap items-end mt-6 gap-4">
                  <div className="order-4 w-full mt-4 md:order-1 md:basis-[530px] md:grow lg:basis-0">
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

                {/* this div makes space for filter tab when it is opened */}
                {/* this div's height is equal to the height of filter tab */}
                {isFilterTabOpen && (
                  <div
                    id="phantom-div"
                    style={{ height: `${phantomDivHeight}px` }}
                    className="md:mt-4 lg:mt-6"
                  ></div>
                )}
                <div className="h-[50px] bg-blue-100 border rounded"></div>
              </TabPanel>

              <TabPanel>Coming soon...</TabPanel>
            </TabPanels>
          </React.Fragment>
        );
      }}
    </Tabs>
  );
};
