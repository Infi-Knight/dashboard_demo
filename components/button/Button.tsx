import * as React from 'react';
import Link, { LinkProps } from 'next/link';

interface LinkButtonProps extends React.ComponentPropsWithoutRef<'a'> {
  icon?: JSX.Element;
}
type LinkButtonRef = HTMLAnchorElement;

// eslint-disable-next-line react/display-name
export const LinkButton = React.forwardRef<LinkButtonRef, LinkButtonProps>(
  ({ href, onClick, children, icon, className = '', ...restProps }, ref) => {
    return (
      <a
        href={href}
        onClick={onClick}
        ref={ref}
        className="flex items-center py-2 pl-6 pr-8 text-white border rounded bg-primary-blue"
        {...restProps}
      >
        <span className="px-1 py-0.5">{icon}</span>
        <span
          className={`ml-2 text-sm font-semibold tracking-[0.02em] ${className}`}
        >
          {children}
        </span>
      </a>
    );
  }
);

interface LinkButtonProps extends React.ComponentPropsWithoutRef<'a'> {
  icon?: JSX.Element;
}
export const Button = (): JSX.Element => {
  return <button>button</button>;
};
