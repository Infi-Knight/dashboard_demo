import * as React from 'react';
import {
  CustomCheckboxContainer,
  CustomCheckboxContainerProps,
  CustomCheckboxInput,
  CustomCheckboxInputProps,
} from '@reach/checkbox';

import { SVGIcon, UiColor } from '@/types/index';
import { getCheckboxStyles } from '@/components/filter/utils';

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
}
export default function InvoiceFilterCheckbox({
  Icon,
  color,
  statusName,
  checked,
  name,
  value,
}: InvoiceFilterCheckboxProps): JSX.Element {
  const [checkedState, setChecked] = React.useState(checked || false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  const { labelBorder, labelBg, svgColor } = React.useMemo(
    () => getCheckboxStyles(color),
    [color, getCheckboxStyles]
  );

  const borderColor = checkedState ? labelBorder : 'border-gray-200';
  const bgColor = checkedState ? labelBg : 'bg-gray-100';
  const iconStyles = checkedState
    ? `${svgColor} mr-2.5`
    : 'text-gray-500 mr-2.5';

  // TODO: fix keyboard focus styles e.g by a focus ring on label using focus-within. looks ugly though?
  const labelStyles = `select-none inline-flex items-center ${bgColor} p-1 pl-2.5 pr-3 border rounded-[20px] text-gray-800 cursor-pointer ${borderColor}`;

  return (
    <div className="inline-block list-none">
      <label className={labelStyles}>
        <CustomCheckboxContainer
          checked={checkedState}
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
