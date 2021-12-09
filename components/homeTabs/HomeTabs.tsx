import * as React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs';

import { ClubSelector } from '@/components/clubSelector';

// TODO: https://css-tricks.com/bold-on-hover-without-the-layout-shift/
// fix the shift due to font weight change on tab change
export const HomeTabs = (): JSX.Element => {
  return (
    <Tabs>
      {({ selectedIndex, focusedIndex }) => {
        let getTabStyle = (index: number) => {
          if (selectedIndex === index) {
            // active tab
            return `text-primary-blue font-bold border-b-4 border-primary-blue`;
          } else {
            return `text-cool-gray-600 border-b-4 border-transparent`;
          }
        };
        return (
          <React.Fragment>
            <TabList className="bg-white border-b border-cool-gray-200">
              <Tab className={`px-2.5 py-4 ${getTabStyle(0)}`}>Invoices</Tab>
              <Tab className={`px-2.5 py-4 ${getTabStyle(1)}`}>Drafts</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <div className="flex pt-9">
                  <ClubSelector
                    id="invoice"
                    clubs={['AFC Eskilstuna', 'AIK Atlas', 'Adolfsbergs IK']}
                    defaultClub="AFC Eskilstuna"
                  />
                </div>
              </TabPanel>
              <TabPanel>Coming soon...</TabPanel>
            </TabPanels>
          </React.Fragment>
        );
      }}
    </Tabs>
  );
};
