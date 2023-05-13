import { Button } from '@/components/Button';
import { IconButton } from '@/components/IconButton';
import Link from 'next/link';
import { ReactComponent as ChevronLeft } from 'public/icons/chevron-left.svg';
import { PropsWithChildren } from 'react';

export default function VideoLayout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <div className="absolute inset-0 z-10 flex w-full justify-between p-8">
        <Link href="/">
          <IconButton label="Go Back">
            <ChevronLeft />
          </IconButton>
        </Link>

        <Link href="/experience/ichiro/start">
          <Button>Skip</Button>
        </Link>
      </div>

      {children}
    </>
  );
}
