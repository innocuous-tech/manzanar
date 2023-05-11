import { IconButton } from '@/components/IconButton';
import { ReactComponent as MenuIcon } from 'public/icons/menu.svg';
import { PropsWithChildren } from 'react';

export default function ExperienceLayout({ children }: PropsWithChildren<{}>) {
  return (
    <div className="relative h-screen w-screen bg-[url('/images/bg1.png')] bg-cover text-lg sm:text-xl md:text-3xl">
      <IconButton
        className="absolute right-4 top-4 sm:right-8 sm:top-8"
        label="Open Menu"
      >
        <MenuIcon />
      </IconButton>

      <div className="mx-auto p-4 pt-[6rem] sm:max-w-[calc(100%-(64px*3))] sm:px-16 sm:py-8">
        {children}
      </div>
    </div>
  );
}
