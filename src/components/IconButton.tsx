import { Button } from '@/components/Button';
import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

export const IconButton = ({
  className,
  ...props
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  children: JSX.Element;
}) => {
  return (
    <Button
      className={clsx(
        className,
        '[&>svg]:h-10',
        '[&>svg]:w-10',
        '!p-6',
        'bg-darkBrownOverlay',
      )}
      {...props}
    />
  );
};
