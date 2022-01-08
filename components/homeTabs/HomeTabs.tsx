import * as React from 'react';
import { useAtom } from 'jotai';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs';

import {
  invoicesAtom,
  currentPageAtom,
  paginationDataAtom,
  appliedFiltersAtom,
} from '@/store/store';

import { Button } from '@/components/button';
import ArrowLeftIcon from '@/icons/arrow_left.svg';
import ArrowRightIcon from '@/icons/arrow_right.svg';
import { InvoicesPanel } from './InvoicesPanel';

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
                <Pagination />
              </TabPanel>

              <TabPanel>Coming soon...</TabPanel>
            </TabPanels>
          </React.Fragment>
        );
      }}
    </Tabs>
  );
};

function Pagination() {
  const [invoices] = useAtom(invoicesAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [{ total, perPageLimit }] = useAtom(paginationDataAtom);

  const totalPages = Math.max(Math.ceil(total / perPageLimit), 1); // to prevent totalPages being 0

  const activePageClasses =
    'flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-full text-primary-blue lg:rounded';

  const inactivePageClasses = 'px-1 py-2 text-gray-600 cursor-pointer';

  if (
    perPageLimit !== undefined &&
    currentPage !== undefined &&
    totalPages !== undefined &&
    invoices.length > 0
  ) {
    return (
      <div className="flex flex-col items-center pb-8 mx-0 mt-4 select-none md:mx-6 lg:mx-12">
        <span className="self-end hidden text-xs text-gray-700 lg:block">
          Displaying {(currentPage - 1) * perPageLimit + invoices.length} of{' '}
          {total} items
        </span>
        <div className="flex items-center justify-center mx-auto gap-[20.5px] mt-8 lg:mt-0">
          <Button
            className="p-4 pr-0"
            variant="secondary"
            Icon={ArrowLeftIcon}
            disabled={currentPage <= 1}
            iconClasses={currentPage > 1 ? 'text-gray-600' : 'text-gray-300'}
            onClick={() => setCurrentPage(currentPage - 1)}
          />
          <div className="flex items-center justify-center gap-[5px] font-semibold">
            {Array(currentPage - 1)
              .fill(0)
              .map((_, index) => (
                <Button
                  variant="secondary"
                  className={inactivePageClasses}
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </Button>
              ))}
            <Button
              variant="secondary"
              className={activePageClasses}
              disabled={true}
            >
              {currentPage}
            </Button>
            {Array(totalPages - currentPage)
              .fill(0)
              .map((_, index) => (
                <Button
                  variant="secondary"
                  className={inactivePageClasses}
                  key={index}
                  onClick={() => setCurrentPage(index + currentPage + 1)}
                >
                  {index + currentPage + 1}
                </Button>
              ))}
          </div>
          <Button
            className="p-4 pl-0"
            iconClasses={
              currentPage < totalPages ? 'text-gray-600' : 'text-gray-300'
            }
            variant="secondary"
            Icon={ArrowRightIcon}
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          />
        </div>
      </div>
    );
  }
  return null;
}
