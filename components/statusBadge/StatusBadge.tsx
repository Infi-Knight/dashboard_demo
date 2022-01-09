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
  text?: string;
}
const StatusBadge = React.memo(function StatusBadge({
  status,
  onClick,
  CustomIcon,
  iconPosition = 'left',
  text,
  labelClassesOverrides,
}: StatusBadgeProps) {
  const {
    statusName,
    icon: Icon,
    color,
  } = React.useMemo(() => invoiceStatusUiData[status], [status]);

  const badgeText = text !== undefined ? text : statusName;

  let { labelBorder, labelBg, svgColor } = React.useMemo(
    () => getCheckboxStyles(color),
    [color]
  );

  if (labelClassesOverrides?.includes('bg-')) {
    labelBg = ''
  }

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

export function getBadgeText(
  intl: any,
  status: InvoiceStatus,
  remaining: number
): string | undefined {
  let badgeText;
  if (
    status === InvoiceStatus.PartlyPaid ||
    status === InvoiceStatus.Overpaid
  ) {
    badgeText = getFormattedCurrency(remaining);
    badgeText = intl.formatNumber(remaining, {
      style: 'currency',
      currency: 'SEK',
    });
  } else if (status === InvoiceStatus.Paid) {
    badgeText = 'Fully paid';
  }
  return badgeText;
}
