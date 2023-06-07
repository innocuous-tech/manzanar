import clsx from 'clsx';
import { ReactComponent as DownwardTriangleIcon } from 'public/icons/downward-triangle.svg';
import { ButtonHTMLAttributes } from 'react';

type ContinueButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'type'
>;

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
        'group typography-tooltip absolute bottom-3 right-3 inline-flex items-end gap-4 lg:bottom-6 lg:right-6',
      )}
      type="button"
      {...props}
    >
      <span className="group-hover:underline group-focus-visible:underline">
        {children ?? 'Continue'}
      </span>

      <DownwardTriangleIcon className="h-5 w-5 animate-bounce lg:h-6 lg:w-6" />
    </button>
  );
};
