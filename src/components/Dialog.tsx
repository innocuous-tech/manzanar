'use client';

import { IconButton } from '@/components/IconButton';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { ReactComponent as XIcon } from 'public/icons/x.svg';
import { forwardRef } from 'react';

export const DialogContent = forwardRef<
  HTMLDivElement,
  DialogPrimitive.DialogContentProps
>(({ children, ...props }, forwardedRef) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 data-[state=closed]:animate-toNoOpacity data-[state=open]:animate-toFullOpacity" />

    <DialogPrimitive.Content
      {...props}
      className={clsx(
        props.className,
        'fixed left-[50%] top-[50%] flex h-full w-full translate-x-[-50%] translate-y-[-50%] flex-col-reverse items-end gap-6 rounded-xl bg-darkBrownOverlay p-12 shadow-overlay outline-none data-[state=closed]:animate-dialogContentHide data-[state=open]:animate-dialogContentShow sm:block sm:h-[calc(100%-8rem)] sm:w-[calc(100%-18rem)] sm:rounded-xl md:w-[calc(100%-24rem)]',
      )}
      ref={forwardedRef}
    >
      <div className="custom-scrollbar h-full overflow-y-auto pr-6 text-cream">
        {children}
      </div>

      <DialogPrimitive.Close asChild>
        <IconButton
          className="sm:absolute sm:-right-[7rem] sm:top-0 sm:shadow-overlay md:-right-[8rem]"
          label="Close Dialog"
          hasTooltip={false}
        >
          <XIcon />
        </IconButton>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));

DialogContent.displayName = 'DialogContent';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
