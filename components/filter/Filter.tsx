import * as React from 'react';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@reach/disclosure';

import FilterIcon from '@/icons/filter_icon.svg';
import OverdueIcon from '@/icons/overdue_icon.svg';
import NotpaidIcon from '@/icons/not_paid_icon.svg';
import PartlyPaidIcon from '@/icons/partly_paid_icon.svg';
import CreditedIcon from '@/icons/credited_icon.svg';
import PaidIcon from '@/icons/paid_icon.svg';
import OverpaidIcon from '@/icons/overpaid_icon.svg';
import CanceledIcon from '@/icons/not_paid_icon.svg';
import ClearIcon from '@/icons/clear_icon.svg';
import DoneIcon from '@/icons/done_icon.svg';
import DeleteIcon from '@/icons/delete_icon.svg';

import { InvoiceStatus, SVGIcon, UiColor } from '@/types/index';
import InvoiceFilterCheckBox from '@/components/filter/InvoiceFilterCheckBox';
import { Button } from '@/components/button';
import { invoiceStatuses } from '@/config/index';

type StatusUiDataType = {
  statusName: string;
  icon: SVGIcon;
  color: UiColor;
};
export const invoiceStatusUiData: {
  [key in InvoiceStatus]: StatusUiDataType;
} = {
  [InvoiceStatus.Overdue]: {
    statusName: 'Overdue',
    icon: OverdueIcon,
    color: UiColor.RED,
  },
  [InvoiceStatus.NotPaid]: {
    statusName: 'Not paid',
    icon: NotpaidIcon,
    color: UiColor.AMBER,
  },
  [InvoiceStatus.PartlyPaid]: {
    statusName: 'Partly paid',
    icon: PartlyPaidIcon,
    color: UiColor.VIOLET,
  },
  [InvoiceStatus.Credited]: {
    statusName: 'Credited',
    icon: CreditedIcon,
    color: UiColor.BLUE,
  },
  [InvoiceStatus.Paid]: {
    statusName: 'Paid',
    icon: PaidIcon,
    color: UiColor.EMERALD,
  },
  [InvoiceStatus.Overpaid]: {
    statusName: 'Overpaid',
    icon: OverpaidIcon,
    color: UiColor.EMERALD,
  },
  [InvoiceStatus.Canceled]: {
    statusName: 'Canceled',
    icon: CanceledIcon,
    color: UiColor.RED,
  },
};
export const filterTabId = 'invoice-filter-tab';
export type FilterProps = {
  setIsFilterTabOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const Filter = ({ setIsFilterTabOpen }: FilterProps): JSX.Element => {
  const [isOpen, setOpen] = React.useState(false);
  const [filters, setFilters] = React.useState<InvoiceStatus[]>([
    InvoiceStatus.Canceled,
    InvoiceStatus.Overpaid,
  ]);

  React.useEffect(() => {
    setIsFilterTabOpen(isOpen);
  }, [isOpen, setIsFilterTabOpen]);

  const handleFilterOpen = () => {
    setOpen(!isOpen);
  };

  const btnStyles = isOpen
    ? 'border-primary-blue bg-indigo-100'
    : 'bg-white border-gray-200';

  const handleFiltersSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Disclosure id={filterTabId} open={isOpen} onChange={handleFilterOpen}>
      <div>
        <div className="relative">
          {filters.length > 0 && !isOpen && (
            <span className="flex font-bold justify-center items-center text-[10px] absolute h-3.5 w-3.5 bg-primary-blue text-white rounded-full top-[-7px] right-[-7px]">
              {filters.length}
            </span>
          )}

          <DisclosureButton
            className={`flex items-center justify-center p-3 border rounded shadow-elevation-2 ${btnStyles}`}
          >
            <FilterIcon className="h-3.5 text-primary-blue" />
          </DisclosureButton>
        </div>
        <DisclosurePanel className="bg-body absolute left-0 w-full border border-gray-200 rounded top-[130px] md:top-[140px] lg:top-[74px]">
          <form
            onSubmit={handleFiltersSubmit}
            className="grid grid-cols-1 divide-y"
          >
            <div className="flex items-center justify-between px-4 pt-3 pb-3 md:pt-4 md:px-6 ">
              <span className="text-lg font-medium text-gray-700">
                Filter results
              </span>
              <div className="md:hidden">
                <Button
                  Icon={DeleteIcon}
                  className="text-gray-600"
                  variant="secondary"
                >
                  Clear filters
                </Button>
              </div>
            </div>
            <div className="px-4 pt-5 pb-6 md:px-6">
              <p className="font-medium text-gray-700">Invoice status</p>
              <fieldset className="flex flex-wrap items-center mt-4 gap-2">
                {invoiceStatuses.map((status) => {
                  const {
                    statusName,
                    icon: Icon,
                    color,
                  } = invoiceStatusUiData[status];

                  return (
                    <InvoiceFilterCheckBox
                      key={statusName}
                      value={status}
                      Icon={Icon}
                      color={color}
                      statusName={statusName}
                      name="filters"
                    />
                  );
                })}
              </fieldset>
            </div>
            <div className="flex items-center justify-between px-4 py-3 md:px-6">
              <div className="hidden md:block">
                <Button
                  Icon={DeleteIcon}
                  className="text-gray-600"
                  variant="secondary"
                >
                  Clear filters
                </Button>
              </div>
              <div className="flex">
                <Button
                  Icon={ClearIcon}
                  variant="secondary"
                  className="mr-6 text-red-700"
                >
                  Cancel
                </Button>
                <Button Icon={DoneIcon} type="submit">
                  Apply filters
                </Button>
              </div>
            </div>
          </form>
        </DisclosurePanel>
      </div>
    </Disclosure>
  );
};

export default Filter;
