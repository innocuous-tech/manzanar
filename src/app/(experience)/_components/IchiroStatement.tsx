import clsx from 'clsx';
import { PropsWithChildren } from 'react';

export const IchiroStatement = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <p className={clsx(className, 'ichiro-statement')}>
      <span className="typography-name text-ichiro">Ichiro:</span>{' '}
      <>{typeof children === 'string' ? children.trim() : children}</>
    </p>
  );
};
