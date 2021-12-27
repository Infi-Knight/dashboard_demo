import * as React from 'react';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@reach/disclosure';

import { InvoiceStatus, UiColors } from '@/types/index';
import InvoiceFilterCheckBox from '@/components/filter/InvoiceFilterCheckBox';

import { invoiceStatuses } from '@/config/index';
import FilterIcon from '@/icons/filter_icon.svg';
import OverdueIcon from '@/icons/overdue_icon.svg';
import NotpaidIcon from '@/icons/not_paid_icon.svg';
import PartlyPaidIcon from '@/icons/partly_paid_icon.svg';
import CreditedIcon from '@/icons/credited_icon.svg';
import PaidIcon from '@/icons/paid_icon.svg';
import OverpaidIcon from '@/icons/overpaid_icon.svg';
import CanceledIcon from '@/icons/not_paid_icon.svg';

type StatusUiDataType = {
  statusName: string;
  icon: JSX.Element;
  color: UiColors;
};
const invoiceStatusUiData: {
  [key in InvoiceStatus]: StatusUiDataType;
} = {
  [InvoiceStatus.Overdue]: {
    statusName: 'Overdue',
    icon: OverdueIcon,
    color: UiColors.RED,
  },
  [InvoiceStatus.NotPaid]: {
    statusName: 'Not paid',
    icon: NotpaidIcon,
    color: UiColors.AMBER,
  },
  [InvoiceStatus.PartlyPaid]: {
    statusName: 'Partly paid',
    icon: PartlyPaidIcon,
    color: UiColors.VIOLET,
  },
  [InvoiceStatus.Credited]: {
    statusName: 'Credited',
    icon: CreditedIcon,
    color: UiColors.BLUE,
  },
  [InvoiceStatus.Paid]: {
    statusName: 'Paid',
    icon: PaidIcon,
    color: UiColors.EMERALD,
  },
  [InvoiceStatus.Overpaid]: {
    statusName: 'Overpaid',
    icon: OverpaidIcon,
    color: UiColors.EMERALD,
  },
  [InvoiceStatus.Canceled]: {
    statusName: 'Canceled',
    icon: CanceledIcon,
    color: UiColors.RED,
  },
};

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

  const btnStyles = isOpen
    ? 'border-primary-blue bg-indigo-100'
    : 'border-gray-200';

  return (
    <Disclosure id="invoice-filter" open={isOpen} onChange={handleFilterOpen}>
      <div>
        <DisclosureButton
          className={`flex items-center justify-center p-3 border rounded shadow-elevation-2 ${btnStyles}`}
        >
          <FilterIcon className="h-3.5 text-primary-blue" />
        </DisclosureButton>
        <DisclosurePanel className="absolute left-0 w-full border border-gray-200 rounded top-24">
          <div className="grid grid-cols-1 divide-y">
            <p className="pt-4 pb-3 pl-6 text-lg font-medium text-gray-700">
              Filter results
            </p>
            <div className="pt-5 pb-6 pl-6">
              <p className="font-medium text-gray-700">Invoice status</p>
              <div className="flex items-center mt-4 wrap">
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
                    >
                      {statusName}
                    </InvoiceFilterCheckBox>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center justify-between px-6 py-3">
              <button>Clear filters</button>
              <div>
                <button className="mr-6">Cancel</button>
                <button>Apply</button>
              </div>
            </div>
          </div>
        </DisclosurePanel>
      </div>
    </Disclosure>
  );
};

export default Filter;
