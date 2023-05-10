import { Button } from '@/components/Button';
import { Tooltip } from '@/components/Tooltip';
import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

export const IconButton = ({
  className,
  label,
  ...props
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'aria-label'> & {
  children: JSX.Element;
  label: string;
}) => {
  return (
    <Tooltip content={label}>
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
    </Tooltip>
  );
};
