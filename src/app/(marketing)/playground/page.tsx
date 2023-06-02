'use client';

import { ReactComponent as ChevronLeft } from 'public/icons/chevron-left.svg';
import { ReactComponent as DownwardTriangle } from 'public/icons/downward-triangle.svg';
import { ReactComponent as Menu } from 'public/icons/menu.svg';
import { ReactComponent as Send } from 'public/icons/send.svg';
import { ReactComponent as Transcript } from 'public/icons/transcript.svg';
import { ReactComponent as XIcon } from 'public/icons/x.svg';

import { DummyFullScreenOverlayDialogContent } from '@/app/(marketing)/playground/_components/DummyFullScreenOverlayDialogContent';
import { AutoExpandingTextArea } from '@/components/AutoExpandingTextArea';
import { Button } from '@/components/Button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/Dialog';
import { IconButton } from '@/components/IconButton';
import { Tooltip } from '@/components/Tooltip';
import clsx from 'clsx';
import { PropsWithChildren } from 'react';
import { theme } from '../../../../tailwind.config';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const DSSection = ({
  title,
  children,
}: PropsWithChildren<{ title: string }>) => (
  <section className="panel">
    <h2 className="mb-4 text-2xl text-3xl text-3xl font-semibold underline">
      {title}
    </h2>

    {children}
  </section>
);

const InnerSectionListItem = ({
  children,
  title,
  className,
}: PropsWithChildren<{ className?: string; title: string }>) => (
  <li className={clsx(className, `w-full flex-1 rounded-xl bg-[white] p-4`)}>
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
    <div className="flex w-full flex-col gap-3 place-self-start p-3 pt-32">
      {/**
       * This is a little funny, but we reference many values ONLY in a dynamic manner and so
       * PostCSS strips them. We have used all of them (invisibly) so that they are not
       * considered unused classes.
       */}
      <div className="typography-title typography-body typography-button typography-tooltip typography-name typography-clipboard invisible bg-black bg-cream bg-creamSemi bg-darkBrownOverlay bg-darkBrownText bg-ichiro bg-menuOverlay bg-player text-black text-cream text-creamSemi text-darkBrownOverlay text-darkBrownText text-ichiro text-menuOverlay text-player" />

      <h1 className="text-center text-5xl font-bold">Design System</h1>

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
        <ul className="flex gap-4 [&>*>svg]:w-[3rem]">
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
          <span className="text-lg">Icon Buttons always have a tooltip!</span>

          <Button>Some Button</Button>
          <Button disabled>Some Disabled Button</Button>

          <div className="mt-6 flex gap-12">
            <div className="flex flex-col items-center gap-3">
              <span className="text-lg">Solid variant of Icon Button</span>
              <IconButton label="Open Menu" variant="solid">
                <Menu />
              </IconButton>
            </div>

            <div className="flex flex-col items-center gap-3">
              <span className="text-lg">
                Transparent variant of Icon Button
              </span>
              <IconButton label="Go Back">
                <ChevronLeft />
              </IconButton>
            </div>
          </div>
        </div>
      </DSSection>

      <DSSection title="Form Inputs">
        <AutoExpandingTextArea
          onSubmit={noop}
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

      <DSSection title="Dialog">
        <div className="flex flex-col gap-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open Default Dialog</Button>
            </DialogTrigger>

            <DialogContent>
              <h6 className="text-5xl text-ichiro">
                Dialog With Scrollable Content
              </h6>

              <div className="[&>p]:my-12">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam nec justo auctor, hendrerit nunc nec, vehicula mauris.
                  Curabitur turpis justo, varius ac arcu nec, scelerisque
                  interdum nibh. Quisque consectetur quis sem fermentum
                  placerat. In hac habitasse platea dictumst. Ut vitae molestie
                  lorem. Mauris consectetur justo nec libero sagittis aliquam.
                  Mauris luctus vel nibh a pretium.
                </p>

                <p>
                  Sed sit amet blandit eros. Nullam varius sit amet ipsum quis
                  efficitur. Etiam rhoncus, felis vitae sodales tristique, urna
                  mauris mollis dolor, ut elementum turpis arcu malesuada nibh.
                  Sed laoreet blandit enim nec interdum. Aenean non quam non
                  orci euismod malesuada. Pellentesque blandit placerat
                  efficitur. Aliquam dignissim urna sed bibendum lacinia. Sed in
                  dolor rhoncus, porta dolor eu, varius metus. Nunc sem diam,
                  suscipit eget lacus id, venenatis efficitur libero. Vestibulum
                  molestie pulvinar mi, in ullamcorper urna. Vivamus quis
                  interdum est. Nam posuere ligula ut metus tristique efficitur.
                  Nulla magna leo, porttitor nec scelerisque ut, gravida ac
                  felis.
                </p>

                <p>
                  Morbi tempus scelerisque erat, cursus condimentum dolor
                  maximus ac. Suspendisse maximus fringilla nisi, vel vulputate
                  lacus cursus sed. Mauris rhoncus tempor lectus a ultricies.
                  Aenean non elementum dui. Pellentesque eu sagittis ex. Nullam
                  vestibulum, magna vel auctor ultricies, ipsum mauris mollis
                  nibh, in pellentesque lectus risus eget tortor. In quis
                  fringilla quam, sed aliquam est. Maecenas sed luctus felis,
                  sed placerat ipsum.
                </p>

                <p>
                  Morbi tempus scelerisque erat, cursus condimentum dolor
                  maximus ac. Suspendisse maximus fringilla nisi, vel vulputate
                  lacus cursus sed. Mauris rhoncus tempor lectus a ultricies.
                  Aenean non elementum dui. Pellentesque eu sagittis ex. Nullam
                  vestibulum, magna vel auctor ultricies, ipsum mauris mollis
                  nibh, in pellentesque lectus risus eget tortor. In quis
                  fringilla quam, sed aliquam est. Maecenas sed luctus felis,
                  sed placerat ipsum.
                </p>

                <p>
                  Morbi tempus scelerisque erat, cursus condimentum dolor
                  maximus ac. Suspendisse maximus fringilla nisi, vel vulputate
                  lacus cursus sed. Mauris rhoncus tempor lectus a ultricies.
                  Aenean non elementum dui. Pellentesque eu sagittis ex. Nullam
                  vestibulum, magna vel auctor ultricies, ipsum mauris mollis
                  nibh, in pellentesque lectus risus eget tortor. In quis
                  fringilla quam, sed aliquam est. Maecenas sed luctus felis,
                  sed placerat ipsum.
                </p>

                <p>
                  Sed vestibulum ipsum vitae eros ullamcorper laoreet. Morbi
                  nulla elit, lobortis ullamcorper lorem vel, posuere facilisis
                  lorem. Morbi ac velit metus. Integer vestibulum augue vitae
                  eleifend ultrices. Fusce ullamcorper placerat nisi, eget
                  pulvinar sapien tincidunt sit amet. Maecenas tristique mauris
                  sit amet sapien sollicitudin tristique. Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit. Quisque iaculis maximus
                  diam ac elementum. Nullam sed orci sit amet turpis scelerisque
                  auctor vitae eget arcu. Nam volutpat, lacus at imperdiet
                  rhoncus, lectus mauris condimentum metus, nec fermentum mauris
                  justo et nulla.
                </p>

                <p>
                  Aenean luctus mauris at erat interdum ullamcorper. Maecenas a
                  massa lectus. Phasellus laoreet augue eget massa elementum
                  vulputate. Ut pretium, ante vitae iaculis blandit, nisi velit
                  scelerisque eros, sit amet tincidunt lectus lectus tempus
                  ante. Quisque mattis iaculis aliquet. Cras molestie pretium
                  lorem, ac euismod neque pharetra eu. Vestibulum molestie
                  fermentum est.
                </p>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button>Open Full Screen Overlay Dialog</Button>
            </DialogTrigger>

            <DialogContent variant="full-screen-overlay">
              <DummyFullScreenOverlayDialogContent />
            </DialogContent>
          </Dialog>
        </div>
      </DSSection>
    </div>
  );
}
