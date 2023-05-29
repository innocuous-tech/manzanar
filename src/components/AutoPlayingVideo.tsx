'use client';

import { VideoHTMLAttributes } from 'react';

export const AutoPlayingVideo = (
  props: VideoHTMLAttributes<HTMLVideoElement>,
) => {
  return <video autoPlay controls {...props} />;
};
