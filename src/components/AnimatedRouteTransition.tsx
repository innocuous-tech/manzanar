'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

/**
 * @deprecated Won't work yet.
 * @see https://twitter.com/kylemh_/status/1662614940128083969
 */
export const AnimatedRouteTransition = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
