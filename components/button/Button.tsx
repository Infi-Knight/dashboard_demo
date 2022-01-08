import * as React from 'react';
import Link, { LinkProps } from 'next/link';
import { SVGIcon } from '@/types/index';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  Icon?: SVGIcon;
  variant?: 'primary' | 'secondary';
  iconClasses?: string;
}

export const Button = ({
  onClick,
  children,
  Icon,
  iconClasses,
  variant = 'primary',
  className = '',
  ...restProps
}: ButtonProps) => {
  const btnVariantClasses =
    variant === 'primary'
      ? 'bg-primary-blue border rounded pl-6 pr-8'
      : 'bg-transparent border-0';

  return (
    <button
      onClick={onClick}
      className={`flex text-sm justify-center items-center py-2 text-white ${btnVariantClasses} ${className}`}
      {...restProps}
    >
      {Icon && (
        <span className={`mr-3 ${iconClasses}`}>
          <Icon />
        </span>
      )}
      <span className="font-semibold tracking-[0.02em]">{children}</span>
    </button>
  );
};
