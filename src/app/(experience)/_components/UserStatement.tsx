import clsx from 'clsx';
import { PropsWithChildren } from 'react';

export const UserStatement = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <p className={clsx(className, 'overflow-y-auto')}>
      <span className="typography-name">You: </span>
      <>{typeof children === 'string' ? children.trim() : children}</>
    </p>
  );
};
