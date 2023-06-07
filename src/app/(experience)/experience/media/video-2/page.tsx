'use client';

import { cms } from '@/cms';
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
            <Button className="button-variant-filled">Back Home</Button>
          </Link>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 grid w-full place-items-center overflow-clip h-view">
        <video
          autoPlay
          controls
          disablePictureInPicture
          className="h-full w-full object-cover"
        >
          <source src={cms.video2Url} type="video/mp4" />
          <track default src="/subtitles/v2.vtt" kind="captions" srcLang="en" />
          Your browser does not support the video tag.
        </video>
      </div>
    </>
  );
}
