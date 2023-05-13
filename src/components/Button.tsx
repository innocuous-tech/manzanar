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
        'border-2',
        'border-cream',
        'border-solid',
        'cursor-pointer',
        'outline-none',
        'px-6',
        'py-2',
        'sm:px-8',
        'sm:py-3',
        'rounded-xl',
        'text-cream',
        'text-xl',
        'sm:text-3xl',
        'hover:bg-creamSemi',
        'focus-visible:text-darkBrownText',
        'focus-visible:bg-cream',
        'active:text-darkBrownText',
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
