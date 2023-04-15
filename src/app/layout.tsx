import { Chivo } from 'next/font/google';
import './globals.css';

const chivo = Chivo({ subsets: ['latin'] });

export const metadata = {
  title: 'Manzanar',
  description: 'An exploratory project into the experience of Manzanar, leveraging Inworld AI™.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={chivo.className}>{children}</body>
    </html>
  );
}
