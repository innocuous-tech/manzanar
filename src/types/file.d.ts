/** @see https://github.com/newhighsco/next-plugin-svgr#with-typescript */
declare module '*.svg' {
  import { FC, SVGProps } from 'react';
  export const ReactComponent: FC<SVGProps<SVGSVGElement>>;

  const src: string;
  export default src;
}
