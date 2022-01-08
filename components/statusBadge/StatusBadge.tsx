import * as React from 'react';

import { InvoiceStatus, SVGIcon } from '@/types/index';
import { invoiceStatusUiData } from '@/components/filter/utils';
import { getCheckboxStyles } from '@/components/filter/utils';
import { getFormattedCurrency } from '@/utils/index';

// TODO: should the badge text be calculated here or passed directly to this component?
interface StatusBadgeProps extends React.ComponentPropsWithRef<'div'> {
  status: InvoiceStatus;
  CustomIcon?: SVGIcon;
  labelClassesOverrides?: string;
  iconPosition?: 'left' | 'right';
  badgeWithAmount?: boolean; // whether to show label as 'Overpaid' or 'SEK 4.000'
  partlyPaidAmount?: number; // formatted currency string
  overPaidAmount?: number; // formatted currency string
}
const StatusBadge = React.memo(function StatusBadge({
  status,
  onClick,
  partlyPaidAmount,
  CustomIcon,
  badgeWithAmount = true,
  iconPosition = 'left',
  labelClassesOverrides,
  overPaidAmount,
}: StatusBadgeProps) {
  const {
    statusName,
    icon: Icon,
    color,
  } = React.useMemo(() => invoiceStatusUiData[status], [status]);

  let badgeText = statusName;
  if (status === InvoiceStatus.PartlyPaid && badgeWithAmount) {
    if (partlyPaidAmount === undefined) {
      // TODO: remove this default and enable errors
      badgeText = 'SEK 0.000';
      // throw new Error(
      //   `Partly paid status requires the amount that has been paid`
      // );
    } else {
      badgeText = getFormattedCurrency(partlyPaidAmount);
    }
  } else if (status === InvoiceStatus.Overpaid && badgeWithAmount) {
    if (overPaidAmount === undefined) {
      // TODO: remove this default and enable errors
      badgeText = 'SEK 0.000';
      // throw new Error(
      //   `Partly paid status requires the amount that has been paid`
      // );
    } else {
      badgeText = getFormattedCurrency(overPaidAmount);
    }
  } else if (status === InvoiceStatus.Paid) {
    badgeText = 'Fully paid';
  }

  const { labelBorder, labelBg, svgColor } = React.useMemo(
    () => getCheckboxStyles(color),
    [color]
  );

  const labelClasses = `inline-flex items-center gap-[9.65px] ${labelBg} p-1 px-2.5 border rounded-[20px] border-transparent ${labelClassesOverrides}`;
  const iconClasses = `${svgColor} ${
    iconPosition === 'right' ? 'order-1' : ''
  }`;

  return (
    <div className={labelClasses} onClick={onClick}>
      <span className={iconClasses}>
        {CustomIcon !== undefined ? <CustomIcon /> : <Icon />}
      </span>
      <span className="text-xs font-medium text-gray-800 font-montserrat">
        {badgeText}
      </span>
    </div>
  );
});

export default StatusBadge;
