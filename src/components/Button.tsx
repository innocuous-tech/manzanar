import clsx from 'clsx';
import { ButtonHTMLAttributes, forwardRef } from 'react';

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, type = 'button', ...props }, ref) => {
  return (
    <button
      {...props}
      ref={ref}
      type={type}
      className={clsx(className, 'button', 'button-variant-outlined')}
    />
  );
});

Button.displayName = 'Button';
