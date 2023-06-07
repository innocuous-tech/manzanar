import { Chivo } from 'next/font/google';

import clsx from 'clsx';
import './globals.css';

const chivo = Chivo({ subsets: ['latin'] });

import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';

const title = 'Moment in Manzanar - An Interactive Film';

const description =
  'An interactive conversational film experience featuring Ichiro, a fictional Japanese American incarcerated in Manzanar in 1943, played by an AI actor.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    type: 'video.other',
    description,
    title,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(chivo.className, 'bg-black', 'text-cream')}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
