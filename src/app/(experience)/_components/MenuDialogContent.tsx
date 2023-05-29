'use client';

import { DialogClose } from '@radix-ui/react-dialog';
import Link from 'next/link';

export const MenuDialogContent = () => (
  <ul className="typography-button flex flex-col gap-10 p-6 text-center">
    <DialogClose asChild>
      <li>Resume</li>
    </DialogClose>

    <DialogClose asChild>
      <Link href="/">
        <li>Exit Game</li>
      </Link>
    </DialogClose>

    <DialogClose asChild>
      <Link href="/about">
        <li>About</li>
      </Link>
    </DialogClose>

    <DialogClose asChild>
      <Link href="/team">
        <li>The Team</li>
      </Link>
    </DialogClose>
  </ul>
);
