import { IconButton } from '@/components/IconButton';
import Link from 'next/link';
import { ReactComponent as ChevronLeft } from 'public/icons/chevron-left.svg';
import { PropsWithChildren } from 'react';

export default function VideoLayout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <Link href="/">
        <IconButton label="Go Back" className="absolute left-8 top-8 z-10">
          <ChevronLeft />
        </IconButton>
      </Link>

      {children}
    </>
  );
}
