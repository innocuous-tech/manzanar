'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { PropsWithChildren } from 'react';

export const Tooltip = ({
  children,
  content,
}: PropsWithChildren<{ content: string }>) => {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          side="top"
          align="center"
          className="rounded-xl bg-darkBrownOverlay p-6 italic text-cream"
          sideOffset={12}
        >
          {content}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};
