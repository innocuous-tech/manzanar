import { PropsWithChildren } from 'react';

export const IchiroStatement = ({ children }: PropsWithChildren<{}>) => {
  return (
    <>
      <span className="typography-name text-ichiro">Ichiro:</span>
      <p>{children}</p>
    </>
  );
};
