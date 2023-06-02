import { Chivo } from 'next/font/google';

import clsx from 'clsx';
import './globals.css';

const chivo = Chivo({ subsets: ['latin'] });

import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Manzanar',
  description:
    'An exploratory project into the experience of Manzanar, leveraging Inworld AI™.',
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
