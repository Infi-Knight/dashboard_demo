import * as React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs';

// BUG: className is unable to override the reach ui default styling, so using inline styles
// for some reach ui styling
export const HomeTabs = (): JSX.Element => {
  return (
    <Tabs>
      <TabList className="bg-white border border-solid">
        <Tab>Invoices</Tab>
        <Tab>Drafts</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>Invoices panel</TabPanel>
        <TabPanel>Coming soon...</TabPanel>
      </TabPanels>
    </Tabs>
  );
};
