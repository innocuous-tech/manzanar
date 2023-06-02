import { PropsWithChildren } from 'react';

export const UserStatement = ({ children }: PropsWithChildren) => {
  return (
    <>
      <span className="typography-name">You:</span>
      <p>{children}</p>
    </>
  );
};
