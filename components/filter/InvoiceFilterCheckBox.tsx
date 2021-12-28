import * as React from 'react';
import {
  CustomCheckbox,
  CustomCheckboxContainer,
  CustomCheckboxInput,
  CustomCheckboxInputProps,
} from '@reach/checkbox';
import { UiColors } from '@/types/index';

// https://tailwindcss.com/docs/content-configuration#class-detection-in-depth
function getCheckboxStyles(color: UiColors): {
  labelBorder: string;
  labelBg: string;
  svgColor: string;
} {
  switch (color) {
    case UiColors.RED:
      return {
        labelBorder: 'border-red-600',
        labelBg: 'bg-red-100',
        svgColor: 'text-red-700',
      };
      break;
    case UiColors.EMERALD:
      return {
        labelBorder: 'border-emerald-600',
        labelBg: 'bg-emerald-100',
        svgColor: 'text-emerald-700',
      };
      break;
    case UiColors.VIOLET:
      return {
        labelBorder: 'border-violet-600',
        labelBg: 'bg-violet-100',
        svgColor: 'text-violet-700',
      };
      break;
    case UiColors.BLUE:
      return {
        labelBorder: 'border-blue-600',
        labelBg: 'bg-blue-100',
        svgColor: 'text-blue-700',
      };
      break;
    case UiColors.AMBER:
      return {
        labelBorder: 'border-amber-600',
        labelBg: 'bg-amber-100',
        svgColor: 'text-amber-700',
      };
      break;
    default:
      return {
        labelBorder: '',
        labelBg: 'bg-gray-100',
        svgColor: 'text-gray-500',
      };
      break;
  }
}
export default function InvoiceFilterCheckbox({
  children,
  Icon,
  color,
  ...props
}: any): JSX.Element {
  const [checkedState, setChecked] = React.useState(props.checked || false);
  const checked = props.checked != null ? props.checked : checkedState;

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
    <li className="list-none inline-block">
      <label className={labelStyles}>
        <CustomCheckboxContainer
          checked={props.checked != null ? props.checked : checked}
          onChange={handleCheckboxChange}
        >
          <CustomCheckboxInput {...props} />
        </CustomCheckboxContainer>
        <span className={iconStyles}>
          <Icon />
        </span>
        <span className="text-xs font-medium text-gray-800 font-montserrat">
          {children}
        </span>
      </label>
    </li>
  );
}
