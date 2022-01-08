import { InvoiceStatus, SVGIcon, UiColor } from '@/types/index';
import OverdueIcon from '@/icons/overdue_icon.svg';
import NotpaidIcon from '@/icons/not_paid_icon.svg';
import PartlyPaidIcon from '@/icons/partly_paid_icon.svg';
import CreditedIcon from '@/icons/credited_icon.svg';
import PaidIcon from '@/icons/paid_icon.svg';
import OverpaidIcon from '@/icons/overpaid_icon.svg';
import CanceledIcon from '@/icons/not_paid_icon.svg';
// https://tailwindcss.com/docs/content-configuration#class-detection-in-depth
export function getCheckboxStyles(color: UiColor): {
  labelBorder: string;
  labelBg: string;
  svgColor: string;
} {
  switch (color) {
    case UiColor.RED:
      return {
        labelBorder: 'border-red-600',
        labelBg: 'bg-red-100',
        svgColor: 'text-red-700',
      };
    case UiColor.EMERALD:
      return {
        labelBorder: 'border-emerald-600',
        labelBg: 'bg-emerald-100',
        svgColor: 'text-emerald-700',
      };
    case UiColor.VIOLET:
      return {
        labelBorder: 'border-violet-600',
        labelBg: 'bg-violet-100',
        svgColor: 'text-violet-700',
      };
    case UiColor.BLUE:
      return {
        labelBorder: 'border-blue-600',
        labelBg: 'bg-blue-100',
        svgColor: 'text-blue-700',
      };
    case UiColor.AMBER:
      return {
        labelBorder: 'border-amber-600',
        labelBg: 'bg-amber-100',
        svgColor: 'text-amber-700',
      };
    default:
      return {
        labelBorder: '',
        labelBg: 'bg-gray-100',
        svgColor: 'text-gray-500',
      };
  }
}
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