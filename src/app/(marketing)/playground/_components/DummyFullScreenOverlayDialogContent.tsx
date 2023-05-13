'use client';

import { DialogClose } from '@radix-ui/react-dialog';
import Link from 'next/link';

export const DummyFullScreenOverlayDialogContent = () => (
  <ul className="typography-button flex flex-col gap-10 p-6 text-center">
    <DialogClose asChild>
      <Link href="/playground">
        <li>Resume</li>
      </Link>
    </DialogClose>

    <DialogClose asChild>
      <Link href="/playground">
        <li>Exit Game</li>
      </Link>
    </DialogClose>

    <DialogClose asChild>
      <Link href="/playground">
        <li>About</li>
      </Link>
    </DialogClose>

    <DialogClose asChild>
      <Link href="/playground">
        <li>The Team</li>
      </Link>
    </DialogClose>
  </ul>
);
