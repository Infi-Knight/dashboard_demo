import * as React from 'react';
import { useAtom } from 'jotai';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@reach/disclosure';
import FocusLock from 'react-focus-lock';

import FilterIcon from '@/icons/filter_icon.svg';
import ClearIcon from '@/icons/clear_icon.svg';
import DoneIcon from '@/icons/done_icon.svg';
import DeleteIcon from '@/icons/delete_icon.svg';

import { InvoiceFilterCheckBoxes } from '@/components/filter/InvoiceFilterCheckBox';
import { Button } from '@/components/button';

import { appliedFiltersAtom, selectedFiltersAtom } from '@/store/store';

export const filterTabId = 'invoice-filter-tab';
export type FilterProps = {
  setIsFilterTabOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const Filter = ({ setIsFilterTabOpen }: FilterProps): JSX.Element => {
  const [isOpen, setOpen] = React.useState(false);
  const [appliedFilters, setAppliedFilters] = useAtom(appliedFiltersAtom);
  const [selectedFilters, setSelectedFilters] = useAtom(selectedFiltersAtom);

  React.useEffect(() => {
    // if we change applied filters when the filter tab is closed, the changes should
    // get synced to filters selected from the ui
    if (!isOpen) {
      setSelectedFilters(appliedFilters);
    }
  }, [appliedFilters, isOpen, setSelectedFilters]);

  React.useEffect(() => {
    setIsFilterTabOpen(isOpen);
  }, [isOpen, setIsFilterTabOpen]);

  const handleFilterOpen = () => {
    setOpen(!isOpen);
  };

  const btnStyles = isOpen
    ? 'border-primary-blue bg-indigo-100'
    : 'bg-white border-gray-200';

  const handleFiltersSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(false);
    setAppliedFilters(selectedFilters);
  };

  const handleFiltersReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedFilters([]);
    setAppliedFilters([]);
    setOpen(false);
  };

  const handleFiltersCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedFilters(appliedFilters);
    setOpen(false);
  };

  return (
    <Disclosure id={filterTabId} open={isOpen} onChange={handleFilterOpen}>
      <div>
        <div className="relative">
          {appliedFilters.length > 0 && !isOpen && (
            <span className="flex font-bold justify-center items-center text-[10px] absolute h-3.5 w-3.5 bg-primary-blue text-white rounded-full top-[-7px] right-[-7px]">
              {appliedFilters.length}
            </span>
          )}

          <DisclosureButton
            className={`flex items-center justify-center p-3 border rounded shadow-elevation-2 ${btnStyles}`}
          >
            <FilterIcon className="h-3.5 text-primary-blue" />
          </DisclosureButton>
        </div>
        <FocusLock>
          <DisclosurePanel className="bg-body absolute left-0 w-full border border-gray-200 rounded top-[130px] md:top-[140px] lg:top-[74px]">
            <div className="grid grid-cols-1 divide-y">
              <div className="flex items-center justify-between px-4 pt-3 pb-3 md:pt-4 md:px-6 ">
                <span className="text-lg font-medium text-gray-700">
                  Filter results
                </span>
                <div className="md:hidden">
                  <Button
                    Icon={DeleteIcon}
                    className="text-gray-600"
                    variant="secondary"
                    onClick={handleFiltersReset}
                  >
                    Clear filters
                  </Button>
                </div>
              </div>
              <div className="px-4 pt-5 pb-6 md:px-6">
                <p className="font-medium text-gray-700">Invoice status</p>
                <div className="flex flex-wrap items-center mt-4 gap-2">
                  <InvoiceFilterCheckBoxes />
                </div>
              </div>
              <div className="flex items-center justify-between px-4 py-3 md:px-6">
                <div className="hidden md:block">
                  <Button
                    Icon={DeleteIcon}
                    className="text-gray-600"
                    variant="secondary"
                    onClick={handleFiltersReset}
                  >
                    Clear filters
                  </Button>
                </div>
                <div className="flex">
                  <Button
                    Icon={ClearIcon}
                    variant="secondary"
                    className="mr-6 text-red-700"
                    onClick={handleFiltersCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleFiltersSubmit}
                    Icon={DoneIcon}
                    type="submit"
                  >
                    Apply filters
                  </Button>
                </div>
              </div>
            </div>
          </DisclosurePanel>
        </FocusLock>
      </div>
    </Disclosure>
  );
};

export default Filter;
