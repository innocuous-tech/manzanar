import { Button } from '@/components/Button';
import { Tooltip } from '@/components/Tooltip';
import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

export const IconButton = ({
  className,
  label,
  hasTooltip = true,
  ...props
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'aria-label'> & {
  children: JSX.Element;
  label: string;
  /** @default true */
  hasTooltip?: boolean;
}) => {
  const button = (
    <Button
      className={clsx(
        className,
        'sm:[&>svg]:h-10',
        'sm:[&>svg]:w-10',
        '[&>svg]:h-8',
        '[&>svg]:w-8',
        '!sm:p-6',
        '!p-4',
        'bg-darkBrownOverlay',
      )}
      aria-label={label}
      {...props}
    />
  );

  if (!hasTooltip) return button;

  return <Tooltip content={label}>{button}</Tooltip>;
};
