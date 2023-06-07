import { Button } from '@/components/Button';
import { Tooltip } from '@/components/Tooltip';
import clsx from 'clsx';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface IconButtonProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'children' | 'aria-label'
  > {
  children: JSX.Element;

  label: string;

  /** @default true */
  hasTooltip?: boolean;

  /** @default 'transparent' */
  variant?: 'transparent' | 'solid';
}

export const IconButton = forwardRef<HTMLSpanElement, IconButtonProps>(
  (
    { className, label, hasTooltip = true, variant = 'transparent', ...props },
    ref,
  ) => {
    const isTransparent = variant === 'transparent';
    const button = (
      <Button
        className={clsx(
          className,
          {
            ['border-none bg-darkBrownOverlay shadow-overlay disabled:border-none']:
              !isTransparent,
          },
          'lg:[&>svg]:h-10',
          'lg:[&>svg]:w-10',
          '[&>svg]:h-8',
          '[&>svg]:w-8',
          '!lg:p-6',
          '!p-4',
        )}
        aria-label={label}
        {...props}
      />
    );

    if (!hasTooltip) return <span ref={ref}>{button}</span>;

    return (
      <span ref={ref}>
        <Tooltip content={label}>{button}</Tooltip>
      </span>
    );
  },
);

IconButton.displayName = 'IconButton';
