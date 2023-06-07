'use client';

import { cms } from '@/cms';
import { Button } from '@/components/Button';
import { Dialog, DialogContent } from '@/components/Dialog';
import { IconButton } from '@/components/IconButton';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactComponent as ChevronLeft } from 'public/icons/chevron-left.svg';
import { useEffect, useRef, useState } from 'react';

const Ichiro = ({ possessive }: { possessive?: boolean }) => (
  <span className="text-ichiro">
    <>Ichiro</>
    <>{possessive && `’s`}</>
  </span>
);

export const Video1 = ({ nextPath }: { nextPath: string }) => {
  const { prefetch, push } = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasEnded, setHasEnded] = useState<boolean>(false);
  const endVideo = () => setHasEnded(true);

  // Track video end, but clean up relevant event listeners on "unmount" or on "video end".
  useEffect(() => {
    prefetch(nextPath);

    const video = videoRef.current;

    const onEnd = () => {
      video?.removeEventListener('ended', onEnd);
      endVideo();
    };

    video?.addEventListener('ended', onEnd);

    if (hasEnded) {
      video?.removeEventListener('ended', onEnd);
    }

    return () => {
      video?.removeEventListener('ended', onEnd);
    };
  }, [hasEnded, nextPath, prefetch]);

  return (
    <>
      <AnimatePresence>
        {!hasEnded && (
          <motion.div
            className="absolute inset-0 z-10 flex h-fit w-full justify-between p-8"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link href="/">
              <IconButton label="Go Back" className="button-variant-filled">
                <ChevronLeft />
              </IconButton>
            </Link>

            <Button className="button-variant-filled" onClick={endVideo}>
              Skip
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={hasEnded} onOpenChange={() => setHasEnded(false)}>
        {/* <Dialog open={hasEnded} onOpenChange={() => push(nextPath)}> */}
        <div className="w-view absolute inset-0 grid place-items-center overflow-clip h-view">
          <div className="w-full bg-[url('/images/bg1.png')] bg-cover h-view">
            <AnimatePresence>
              <>
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
                    <source src={cms.video1Url} type="video/mp4" />
                    <track
                      default
                      src="/subtitles/v1.vtt"
                      kind="captions"
                      srcLang="en"
                    />
                    Your browser does not support the video tag.
                  </motion.video>
                )}

                <DialogContent variant="tutorial">
                  <p>
                    It’s 1943, you are about to meet <Ichiro />, a fictional
                    Japanese American incarcerated in the Manzanar concentration
                    camp.
                  </p>

                  <p>
                    <Ichiro /> has left questions 27 and 28 in his loyalty
                    questionnaire blank.
                  </p>

                  <p>
                    You will be playing the part of a war relocation authority
                    agent, and{' '}
                    <span className="font-extrabold">
                      it’s your job to get <Ichiro possessive /> answers to
                      questions 27 and 28
                    </span>
                    .
                  </p>

                  <p>
                    <Ichiro /> is played by a digital AI actor, who will respond
                    to you depending on what you say to him.
                  </p>

                  <p>
                    You’ve just invited <Ichiro /> into the interrogation room.
                  </p>
                </DialogContent>
              </>
            </AnimatePresence>
          </div>
        </div>
      </Dialog>
    </>
  );
};
