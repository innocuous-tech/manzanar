'use client';

import { IconButton } from '@/components/IconButton';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { ReactComponent as XIcon } from 'public/icons/x.svg';
import { forwardRef } from 'react';

export const DialogContent = forwardRef<
  HTMLDivElement,
  DialogPrimitive.DialogContentProps & {
    variant?: 'default' | 'full-screen-overlay';
  }
>(({ children, variant = 'default', ...props }, forwardedRef) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-30 data-[state=closed]:animate-toNoOpacity data-[state=open]:animate-toFullOpacity" />

    <DialogPrimitive.Content
      {...props}
      className={clsx(props.className, {
        ['fixed left-[50%] top-[50%] flex h-full w-full translate-x-[-50%] translate-y-[-50%] flex-col-reverse items-end gap-6 rounded-xl bg-darkBrownOverlay p-12 shadow-overlay outline-none data-[state=closed]:animate-dialogContentHide data-[state=open]:animate-dialogContentShow sm:block sm:h-[calc(100%-8rem)] sm:w-[calc(100%-18rem)] sm:rounded-xl md:w-[calc(100%-24rem)]']:
          variant === 'default',
        ['fixed inset-0 z-30 grid h-screen w-screen place-items-center bg-menuOverlay']:
          variant === 'full-screen-overlay',
      })}
      ref={forwardedRef}
    >
      <div
        className={clsx('overflow-y-auto text-cream', {
          ['custom-scrollbar h-full pr-6']: variant === 'default',
        })}
      >
        {children}
      </div>

      <DialogPrimitive.Close asChild>
        <IconButton
          className={clsx({
            ['sm:absolute sm:-right-[7rem] sm:top-0 sm:shadow-overlay md:-right-[8rem]']:
              variant === 'default',
            ['absolute right-8 top-8 shadow-overlay']:
              variant === 'full-screen-overlay',
          })}
          label="Close Dialog"
          hasTooltip={false}
          variant={variant === 'default' ? 'transparent' : 'solid'}
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
