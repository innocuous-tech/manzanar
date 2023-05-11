'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

import { ComponentProps } from 'react';

type LinkWithActiveRouteStylesProps = ComponentProps<typeof Link> & {
  children: string;
};

export const LinkWithActiveRouteStyles = (
  props: LinkWithActiveRouteStylesProps,
) => {
  const segment = useSelectedLayoutSegment();
  const isActive = segment?.toLowerCase() === props?.children?.toLowerCase();

  return (
    <Link
      {...props}
      className={clsx(
        { underline: isActive },
        'decoration-1 underline-offset-8',
      )}
    />
  );
};
