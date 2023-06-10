/* eslint-disable @next/next/no-img-element */
'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface UseIncrementingValueProps {
  x: number;
  y: number;
}

const useIncrementingValue = ({ x, y }: UseIncrementingValueProps): number => {
  const [value, setValue] = useState(x);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prevValue) => (prevValue >= y ? x : prevValue + 1));
    }, 3_000);

    // Clean up interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, [x, y]);

  return value;
};

export const RotatingIchiroAvatar = () => {
  const currentNumber = useIncrementingValue({ x: 1, y: 8 });

  return (
    <div className="pointer-events-none absolute inset-0 top-[unset] flex h-full w-full items-end justify-center overflow-hidden overflow-clip">
      <AnimatePresence mode="popLayout">
        <motion.img
          src={`/images/ichiro/draft${currentNumber}.webp`}
          key={`ichiro-${currentNumber}`}
          alt=""
          className="h-auto w-[90vh] max-w-[unset] translate-y-[10vh] sm:translate-y-[20vh] md:w-[max(500px,75%)] md:max-w-[70rem]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>
    </div>
  );
};

export type IchiroVariant =
  | 'neutral'
  | 'side-eye'
  | 'crossed-arms-disbelief'
  | 'fists-together-aversion'
  | 'ear-grab'
  | 'interlaced-fingers'
  | 'pointing-at-user'
  | 'crossed-arms-unmoved';

export type SetIchiroVariant = (variant: IchiroVariant) => void;

export const getIchiroResponseVariant = ({
  shouldPoint,
}: {
  shouldPoint: boolean;
}) => {
  if (shouldPoint) return 'pointing-at-user';

  const relevantVariants: IchiroVariant[] = [
    'crossed-arms-disbelief',
    'fists-together-aversion',
    'interlaced-fingers',
    'crossed-arms-unmoved',
    'side-eye',
    'ear-grab',
  ];

  const randomItemFromRelevantVariants =
    relevantVariants[Math.floor(Math.random() * relevantVariants.length)];

  return randomItemFromRelevantVariants;
};

export interface IchiroAvatarProps {
  variant: IchiroVariant;
}

const variantDraftMap: {
  [key in IchiroVariant]: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
} = {
  neutral: 1,
  'side-eye': 2,
  'crossed-arms-disbelief': 3,
  'fists-together-aversion': 4,
  'ear-grab': 5,
  'interlaced-fingers': 6,
  'pointing-at-user': 7,
  'crossed-arms-unmoved': 8,
};

export const IchiroAvatar = ({ variant }: IchiroAvatarProps) => {
  const draftNumber = variantDraftMap[variant];

  return (
    <AnimatePresence>
      <motion.div
        key={`static-${variant}`}
        className="pointer-events-none absolute inset-0 top-[unset] flex h-full w-full items-end justify-center overflow-hidden overflow-clip"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <img
          src={`/images/ichiro/draft${draftNumber}.webp`}
          alt=""
          className={clsx(
            'max-w-[unset]',
            'h-auto',
            'w-[95vh]',
            'translate-y-[15vh]',
            'lg:h-auto',
            'lg:w-[100vh]',
            'lg:translate-y-[12vh]',
            'xl:h-[100vh]',
            'xl:w-auto',
            'xl:translate-y-[15vh]',
          )}
        />
      </motion.div>
    </AnimatePresence>
  );
};
