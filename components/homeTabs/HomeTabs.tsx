import * as React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs';

import { InvoicesPanel } from './InvoicesPanel';
// TODO: https://css-tricks.com/bold-on-hover-without-the-layout-shift/
// fix the shift due to font weight change on tab change
// TODO: fix margins on > 1280px
//
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
                <InvoicesPanel />
              </TabPanel>

              <TabPanel>Coming soon...</TabPanel>
            </TabPanels>
          </React.Fragment>
        );
      }}
    </Tabs>
  );
};
