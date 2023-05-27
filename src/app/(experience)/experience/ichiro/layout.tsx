import { IchiroAvatar } from '@/app/(experience)/_components/IchiroAvatar';
import { MenuDialogContent } from '@/app/(experience)/_components/MenuDialogContent';
import { Dialog, DialogContent, DialogTrigger } from '@/components/Dialog';
import { IconButton } from '@/components/IconButton';
import { Tooltip } from '@/components/Tooltip';
import { ReactComponent as MenuIcon } from 'public/icons/menu.svg';
import { PropsWithChildren } from 'react';

export default function IchiroLayout({ children }: PropsWithChildren<{}>) {
  return (
    <div className="relative h-screen w-screen bg-[url('/images/bg1.png')] bg-cover text-lg sm:text-xl md:text-3xl">
      <Dialog>
        {/**
         * Because we use this IconButton as a DialogTrigger, we need to ignore the Tooltip
         * abstraction within the IconButton component because IconButton provider isn't an
         * element that can take click events.
         */}
        <Tooltip content="Open Menu">
          <DialogTrigger asChild>
            <IconButton
              className="absolute right-4 top-4 sm:right-8 sm:top-8"
              label="Open Menu"
              variant="solid"
              hasTooltip={false}
            >
              <MenuIcon />
            </IconButton>
          </DialogTrigger>
        </Tooltip>

        <DialogContent variant="full-screen-overlay">
          <MenuDialogContent />
        </DialogContent>
      </Dialog>

      <div className="mx-auto p-4 pt-[6rem] sm:max-w-[calc(100%-(64px*3))] sm:px-16 sm:py-8">
        {children}

        <IchiroAvatar />
      </div>
    </div>
  );
}
