import * as React from 'react';
import Link, { LinkProps } from 'next/link';
import { SVGIcon } from '@/types/index';

interface LinkButtonProps extends React.ComponentPropsWithoutRef<'a'> {
  Icon?: SVGIcon;
  iconClasses?: string;
}
type LinkButtonRef = HTMLAnchorElement;

// eslint-disable-next-line react/display-name
export const LinkButton = React.forwardRef<LinkButtonRef, LinkButtonProps>(
  (
    {
      href,
      onClick,
      children,
      Icon,
      iconClasses = '',
      className = '',
      ...restProps
    },
    ref
  ) => {
    return (
      <a
        href={href}
        onClick={onClick}
        ref={ref}
        className={`flex text-sm justify-center items-center py-2 pl-6 pr-8 text-white border rounded bg-primary-blue ${className}`}
        {...restProps}
      >
        {Icon && (
          <span className={`px-1 py-0.5 ${iconClasses}`}>
            <Icon />
          </span>
        )}
        <span className="ml-2 font-semibold tracking-[0.02em]">{children}</span>
      </a>
    );
  }
);
