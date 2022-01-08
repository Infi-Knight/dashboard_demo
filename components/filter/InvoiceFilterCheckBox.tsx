import * as React from 'react';
import { useAtom } from 'jotai';
import {
  CustomCheckboxContainer,
  CustomCheckboxContainerProps,
  CustomCheckboxInput,
  CustomCheckboxInputProps,
} from '@reach/checkbox';

import { selectedFiltersAtom } from '@/store/store';

import { InvoiceStatus, SVGIcon, UiColor } from '@/types/index';
import { getCheckboxStyles } from '@/components/filter/utils';
import { invoiceStatuses } from '@/config/index';
import { invoiceStatusUiData } from './Filter';

export function InvoiceFilterCheckBoxes() {
  return (
    <>
      {invoiceStatuses.map((status) => {
        const { statusName, icon: Icon, color } = invoiceStatusUiData[status];

        return (
          // for some reasons the InvoiceFilterCheckBox is not reacting properly
          // to state changes so I am forcing it to rerender on filters reset by
          // providing a checked status dependent key
          <InvoiceFilterCheckBox
            key={statusName}
            value={status}
            status={status}
            Icon={Icon}
            color={color}
            statusName={statusName}
            name="filters"
          />
        );
      })}
    </>
  );
}
// InvoiceFilterCheckbox does not require a children prop
type FilterCheckBoxBaseReachUiProps = Omit<
  CustomCheckboxContainerProps,
  'children'
> &
  CustomCheckboxInputProps;
export interface InvoiceFilterCheckboxProps
  extends FilterCheckBoxBaseReachUiProps {
  statusName: string;
  Icon: SVGIcon;
  color: UiColor;
  status: InvoiceStatus;
}

function InvoiceFilterCheckBox({
  Icon,
  color,
  statusName,
  name,
  value,
  status,
}: InvoiceFilterCheckboxProps) {
  const [selectedFilters, setSelectedFilters] = useAtom(selectedFiltersAtom);
  const [checked, setIsChecked] = React.useState(
    selectedFilters.includes(status) || false
  );

  React.useEffect(() => {
    if (selectedFilters.includes(status)) {
      setIsChecked(true);
    } else setIsChecked(false);
  }, [selectedFilters, status]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedFilters.includes(status)) {
      const newFilters = selectedFilters.filter((item) => item !== status);
      setSelectedFilters(newFilters);
      setIsChecked(false);
    } else {
      const newFilters = [...selectedFilters, status];
      setSelectedFilters(newFilters);
      setIsChecked(true);
    }
  };

  const { labelBorder, labelBg, svgColor } = getCheckboxStyles(color);
  const borderColor = checked ? labelBorder : 'border-transparent';
  const bgColor = checked ? labelBg : 'bg-gray-100';
  const iconStyles = checked ? `${svgColor} mr-2.5` : 'text-gray-500 mr-2.5';

  // TODO: fix keyboard focus styles e.g by a focus ring on label using focus-within. looks ugly though?
  const labelStyles = `select-none inline-flex items-center ${bgColor} p-1 pl-2.5 pr-3 border rounded-[20px] text-gray-800 cursor-pointer ${borderColor}`;

  return (
    <div className="inline-block list-none">
      <label className={labelStyles}>
        <CustomCheckboxContainer
          checked={checked}
          onChange={handleCheckboxChange}
        >
          <CustomCheckboxInput name={name} value={value} />
        </CustomCheckboxContainer>
        <span className={iconStyles}>
          <Icon />
        </span>
        <span className="text-xs font-medium text-gray-800 font-montserrat">
          {statusName}
        </span>
      </label>
    </div>
  );
}
