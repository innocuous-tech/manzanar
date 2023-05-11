import { IchiroAvatar } from '@/app/(experience)/_components/IchiroAvatar';
import { PropsWithChildren } from 'react';

export default function IchiroLayout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      {children}

      <IchiroAvatar />
    </>
  );
}
