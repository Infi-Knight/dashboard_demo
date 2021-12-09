import * as React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@reach/disclosure';

import { ClubSelector } from '@/components/clubSelector';

type FilterProps = {
  setIsFilterTabOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const Filter = ({ setIsFilterTabOpen }: FilterProps): JSX.Element => {
  const [isOpen, setOpen] = React.useState(false);

  React.useEffect(() => {
    setIsFilterTabOpen(isOpen);
  }, [isOpen, setIsFilterTabOpen]);

  const handleFilterOpen = () => {
    setOpen(!isOpen);
  };

  return (
    <Disclosure id="invoice-filter" open={isOpen} onChange={handleFilterOpen}>
      <DisclosureButton className="flex items-center justify-center p-3 border rounded border-cool-gray-200">
        <img className="h-4" src="/images/filter_icon.svg" />{' '}
      </DisclosureButton>
      <DisclosurePanel className="absolute left-0">
        blah blah blah
      </DisclosurePanel>
    </Disclosure>
  );
};

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
                <div className="flex items-end w-full pt-9">
                  <ClubSelector
                    id="invoice"
                    clubs={['AFC Eskilstuna', 'AIK Atlas', 'Adolfsbergs IK']}
                    defaultClub="AFC Eskilstuna"
                  />
                  <div>
                    <Filter setIsFilterTabOpen={setIsFilterTabOpen} />
                  </div>
                </div>
                {isFilterTabOpen && (
                  <div className="h-[278px] md:h-[246px] lg:[h-218px] bg-red-50"></div>
                )}
              </TabPanel>
              <TabPanel>Coming soon...</TabPanel>
            </TabPanels>
          </React.Fragment>
        );
      }}
    </Tabs>
  );
};
