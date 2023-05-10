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
        '[&>svg]:h-10',
        '[&>svg]:w-10',
        '!p-6',
        'bg-darkBrownOverlay',
      )}
      aria-label={label}
      {...props}
    />
  );

  if (!hasTooltip) return button;

  return <Tooltip content={label}>{button}</Tooltip>;
};
