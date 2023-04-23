import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

export const Button = ({
  className,
  type = 'button',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      type={type}
      className={clsx(
        className,
        'typography-button',
        'rounded-xl',
        'border-2',
        'border-solid',
        'border-cream',
        'px-8',
        'py-3',
        'outline-none',
        'text-cream',
        'hover:bg-creamSemi',
        'focus-visible:text-darkBrownText',
        'active:text-darkBrownText',
        'focus-visible:bg-cream',
        'active:bg-cream',
        'disabled:cursor-not-allowed',
        'disabled:bg-[transparent]',
        'disabled:text-creamSemi',
        'disabled:border-creamSemi',
        'disabled:line-through',
      )}
    />
  );
};
