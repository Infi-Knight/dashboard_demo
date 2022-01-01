import * as React from 'react';

import { InvoiceStatus } from '@/types/index';
import { invoiceStatusUiData } from '@/components/filter/Filter';
import { getCheckboxStyles } from '@/components/filter/utils';

// TODO: should the badge text be calculated here or passed directly to this component?
type StatusBadgeProps = {
  status: InvoiceStatus;
  partlyPaidAmountText?: string; // formatted currency string
  overPaidAmountText?: string; // formatted currency string
};
const StatusBadge = React.memo(function StatusBadge({
  status,
  partlyPaidAmountText,
  overPaidAmountText,
}: StatusBadgeProps) {
  const {
    statusName,
    icon: Icon,
    color,
  } = React.useMemo(
    () => invoiceStatusUiData[status],
    [status, invoiceStatusUiData]
  );

  let badgeText = statusName;
  if (status === InvoiceStatus.PartlyPaid) {
    if (partlyPaidAmountText === undefined) {
      // TODO: remove this default and enable errors
      badgeText = 'SEK 0.000';
      // throw new Error(
      //   `Partly paid status requires the amount that has been paid`
      // );
    } else {
      badgeText = partlyPaidAmountText;
    }
  } else if (status === InvoiceStatus.Overpaid) {
    if (overPaidAmountText === undefined) {
      // TODO: remove this default and enable errors
      badgeText = 'SEK 0.000';
      // throw new Error(
      //   `Partly paid status requires the amount that has been paid`
      // );
    } else {
      badgeText = overPaidAmountText;
    }
  } else if (status === InvoiceStatus.Paid) {
    badgeText = 'Fully paid';
  }

  const { labelBorder, labelBg, svgColor } = React.useMemo(
    () => getCheckboxStyles(color),
    [getCheckboxStyles, color]
  );

  const labelClasses = `inline-flex items-center ${labelBg} p-1 pl-2.5 pr-3 border rounded-[20px] border-transparent`;
  const iconClasses = `${svgColor} mr-2.5`;

  return (
    <div className={labelClasses}>
      <span className={iconClasses}>
        <Icon />
      </span>
      <span className="text-xs font-medium text-gray-800 font-montserrat">
        {badgeText}
      </span>
    </div>
  );
});

export default StatusBadge;
