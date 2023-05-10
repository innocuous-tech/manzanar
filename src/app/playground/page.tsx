import { ReactComponent as ChevronLeft } from 'public/icons/chevron-left.svg';
import { ReactComponent as DownwardTriangle } from 'public/icons/downward-triangle.svg';
import { ReactComponent as Menu } from 'public/icons/menu.svg';
import { ReactComponent as Send } from 'public/icons/send.svg';
import { ReactComponent as Transcript } from 'public/icons/transcript.svg';
import { ReactComponent as XIcon } from 'public/icons/x.svg';

import { AutoExpandingTextArea } from '@/components/AutoExpandingTextArea';
import { Button } from '@/components/Button';
import { IconButton } from '@/components/IconButton';
import { Tooltip } from '@/components/Tooltip';
import clsx from 'clsx';
import { PropsWithChildren } from 'react';
import { theme } from '../../../tailwind.config';

const DSSection = ({
  title,
  children,
}: PropsWithChildren<{ title: string }>) => (
  <section className="panel">
    <h2 className="mb-4 text-3xl font-semibold underline">{title}</h2>

    {children}
  </section>
);

const InnerSectionListItem = ({
  children,
  title,
  className,
}: PropsWithChildren<{ className?: string; title: string }>) => (
  <li
    className={clsx(
      className,
      `min-w-[18rem] flex-1 rounded-xl bg-[white] p-4`,
    )}
  >
    <h4 className="mb-1 border-b-2 border-solid border-black text-xl text-darkBrownText">
      {title}
    </h4>

    {children}
  </li>
);

const typographyVariants = [
  'title',
  'body',
  'button',
  'tooltip',
  'name',
  'clipboard',
];

export default function Page() {
  const themeColors = Object.keys(theme?.colors ?? {});

  return (
    <main className="flex flex-col gap-3 place-self-start p-3">
      {/**
       * This is a little funny, but we reference many values ONLY in a dynamic manner and so
       * PostCSS strips them. We have used all of them (invisibly) so that they are not
       * considered unused classes.
       */}
      <div className="typography-title typography-body typography-button typography-tooltip typography-name typography-clipboard invisible bg-black bg-cream bg-creamSemi bg-darkBrownOverlay bg-darkBrownText bg-ichiro bg-menuOverlay bg-player text-black text-cream text-creamSemi text-darkBrownOverlay text-darkBrownText text-ichiro text-menuOverlay text-player" />

      <h1 className="text-5xl font-bold">Design System</h1>

      <DSSection title="Tokens">
        <ul className="flex flex-wrap gap-3">
          <InnerSectionListItem title="Colors">
            <ul className="flex flex-col gap-2">
              {themeColors.map((color) => (
                <li
                  key={color}
                  className="inline-flex items-center gap-2 text-black"
                >
                  <span
                    className={clsx(
                      `bg-${color}`,
                      'h-5 w-5 rounded-full border-[1px] border-solid border-black',
                    )}
                    aria-hidden
                  />

                  {color}
                </li>
              ))}
            </ul>
          </InnerSectionListItem>

          <InnerSectionListItem title="Text">
            <ul className="flex flex-col gap-4">
              {typographyVariants.map((variant) => (
                <li key={variant} className={`typography-${variant}`}>
                  {variant}
                </li>
              ))}
            </ul>
          </InnerSectionListItem>
        </ul>
      </DSSection>

      <DSSection title="Iconography">
        <ul className="grid grid-cols-[repeat(auto-fit,3rem)] items-center gap-5">
          <li>
            <XIcon />
          </li>
          <li>
            <ChevronLeft />
          </li>
          <li>
            <DownwardTriangle />
          </li>
          <li>
            <Menu />
          </li>
          <li>
            <Send />
          </li>
          <li>
            <Transcript />
          </li>
        </ul>
      </DSSection>

      <DSSection title="Buttons">
        <div className="flex flex-col items-start gap-3">
          <span>Icon Buttons always have a tooltip!</span>

          <Button>Some Button</Button>
          <Button disabled>Some Disabled Button</Button>

          <IconButton label="Open Menu">
            <Menu />
          </IconButton>
        </div>
      </DSSection>

      <DSSection title="Form Inputs">
        <AutoExpandingTextArea
          label="Type here"
          placeholder="Type something to say to Ichiro"
        />
      </DSSection>

      <DSSection title="Tooltip">
        <Tooltip content="Hello there!">
          <span className="mt-[5rem] hover:cursor-pointer">
            Kenobi!!! (hover me)
          </span>
        </Tooltip>
      </DSSection>
    </main>
  );
}
