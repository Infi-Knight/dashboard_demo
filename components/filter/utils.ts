import { UiColor } from '@/types/index';
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
