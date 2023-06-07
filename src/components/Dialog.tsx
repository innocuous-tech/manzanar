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
      className={clsx(props.className, 'fixed z-30', {
        ['left-[50%] top-[50%] flex h-full w-full translate-x-[-50%] translate-y-[-50%] flex-col-reverse items-end gap-6 bg-darkBrownOverlay py-6 pl-14 pr-6 shadow-overlay outline-none data-[state=closed]:animate-dialogContentHide data-[state=open]:animate-dialogContentShow md:w-[calc(100%-24rem)] lg:block lg:h-[calc(100%-8rem)] lg:w-[calc(100%-18rem)] lg:rounded-xl lg:py-12']:
          variant === 'default',
        ['inset-0 grid w-screen place-items-center bg-menuOverlay h-view data-[state=closed]:animate-toNoOpacity data-[state=open]:animate-toFullOpacity']:
          variant === 'full-screen-overlay',
      })}
      ref={forwardedRef}
    >
      <div
        className={clsx('overflow-y-auto text-cream', {
          ['custom-scrollbar h-full w-full pr-6']: variant === 'default',
        })}
      >
        {children}
      </div>

      <DialogPrimitive.Close asChild>
        <IconButton
          className={clsx({
            ['bg-darkBrownOverlay shadow-overlay md:-right-[8rem] lg:absolute lg:-right-[7rem] lg:top-0 lg:shadow-overlay']:
              variant === 'default',
            ['absolute right-4 top-4 shadow-overlay lg:right-8 lg:top-8']:
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
