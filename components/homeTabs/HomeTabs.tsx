import * as React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs';
import VisuallyHidden from '@reach/visually-hidden';
import {
  Listbox,
  ListboxInput,
  ListboxButton,
  ListboxPopover,
  ListboxList,
  ListboxOption,
} from '@reach/listbox';

type ClubSelectorProps = {
  id: string;
  defaultClub: string;
  clubs: string[];
};
const ClubSelector = ({
  id,
  defaultClub,
  clubs,
}: ClubSelectorProps): JSX.Element => {
  let [value, setValue] = React.useState(defaultClub);
  let labelId = `club-label--${id}`;

  return (
    <div className="border-b border-cool-gray-200 pb-1.5">
      <VisuallyHidden id={labelId}>Choose a club</VisuallyHidden>
      <ListboxInput
        aria-labelledby={labelId}
        value={value}
        onChange={(value) => setValue(value)}
        className="flex"
      >
        <img className="mr-6" src="/images/afc_eskilstuna.svg" />
        <ListboxButton
          arrow={<img className="ml-2" src="/images/dropdown_icon.svg" />}
          className="border-none"
        />
        <ListboxPopover className="w-96 p-2">
          <ListboxList>
            {clubs.map((club) => {
              return (
                <ListboxOption key={club} value={club} className="flex">
                  <img src="/images/afc_eskilstuna.svg" />
                  <span className="font-medium font-lg">{club}</span>
                </ListboxOption>
              );
            })}
          </ListboxList>
        </ListboxPopover>
      </ListboxInput>
    </div>
  );
};

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
