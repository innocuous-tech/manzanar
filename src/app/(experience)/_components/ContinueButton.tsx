import clsx from 'clsx';
import { ReactComponent as DownwardTriangleIcon } from 'public/icons/downward-triangle.svg';
import { ButtonHTMLAttributes } from 'react';

interface ContinueButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {}

export const ContinueButton = ({
  children,
  className,
  onClick,
  ...props
}: ContinueButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        className,
        'group typography-tooltip absolute bottom-6 right-6 inline-flex items-end gap-4',
      )}
      {...props}
    >
      <span className="group-hover:underline group-focus-visible:underline">
        {children ?? 'Continue'}
      </span>

      <DownwardTriangleIcon className="h-5 w-5 animate-bounce sm:h-6 sm:w-6" />
    </button>
  );
};
