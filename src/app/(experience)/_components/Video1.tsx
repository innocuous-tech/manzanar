'use client';

import { Button } from '@/components/Button';
import { IconButton } from '@/components/IconButton';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactComponent as ChevronLeft } from 'public/icons/chevron-left.svg';
import { useEffect, useRef, useState } from 'react';

export const Video1 = ({ nextPath }: { nextPath: string }) => {
  const { push } = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasEnded, setHasEnded] = useState<boolean>(false);

  // Track video end, but clean up relevant event listeners on "unmount" or on "video end".
  useEffect(() => {
    const video = videoRef.current;

    const onEnd = () => {
      video?.removeEventListener('ended', onEnd);
      setHasEnded(true);
    };

    video?.addEventListener('ended', onEnd);

    if (hasEnded) {
      video?.removeEventListener('ended', onEnd);
    }

    return () => {
      video?.removeEventListener('ended', onEnd);
    };
  }, [hasEnded]);

  return (
    <>
      <AnimatePresence>
        <motion.div
          className="absolute inset-0 z-10 flex h-fit w-full justify-between p-8"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <Link href="/">
            <IconButton label="Go Back">
              <ChevronLeft />
            </IconButton>
          </Link>

          <Link href={nextPath}>
            <Button>Skip</Button>
          </Link>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 grid h-full w-full place-items-center overflow-clip">
        <div className="h-full w-full bg-[url('/images/bg1.png')] bg-cover">
          <AnimatePresence onExitComplete={() => push(nextPath)}>
            {!hasEnded && (
              <motion.video
                autoPlay
                controls
                disablePictureInPicture
                className="h-full w-full object-cover"
                ref={videoRef}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <source
                  src="https://res.cloudinary.com/dprte0rm8/video/upload/v1685475768/v1_ojzsa5.mp4"
                  type="video/mp4"
                />
                <track
                  default
                  src="/subtitles/v1.vtt"
                  kind="captions"
                  srcLang="en"
                />
                Your browser does not support the video tag.
              </motion.video>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};
