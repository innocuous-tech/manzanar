'use client';

import { Button } from '@/components/Button';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

export default function Page() {
  return (
    <>
      <AnimatePresence>
        <motion.div
          className="absolute inset-0 z-10 flex h-fit w-full justify-end p-8"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <Link href="/">
            <Button>Back Home</Button>
          </Link>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 grid h-full w-full place-items-center overflow-clip">
        <video
          autoPlay
          controls
          disablePictureInPicture
          className="h-full w-full object-cover"
        >
          <source
            src="https://res.cloudinary.com/dprte0rm8/video/upload/v1685475575/v2_t7hdho.mp4"
            type="video/mp4"
          />
          <track default src="/subtitles/v2.vtt" kind="captions" srcLang="en" />
          Your browser does not support the video tag.
        </video>
      </div>
    </>
  );
}
