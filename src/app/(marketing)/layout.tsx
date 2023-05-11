import { LinkWithActiveRouteStyles } from '@/components/LinkWithActiveRouteStyles';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

export default function MarketingLayout({ children }: PropsWithChildren<{}>) {
  return (
    <div className="text-cream">
      <nav className="absolute left-0 right-0 top-0 flex items-center justify-between gap-4 px-8 py-8 text-lg sm:gap-6 sm:px-[6rem] sm:py-14 sm:text-xl md:text-3xl">
        <div>
          <Link href="/" className="uppercase">
            Project Manzanar
          </Link>
        </div>

        <div className="flex items-center justify-between gap-4 sm:gap-12">
          <LinkWithActiveRouteStyles href="/about">
            About
          </LinkWithActiveRouteStyles>

          <LinkWithActiveRouteStyles href="/team">
            Team
          </LinkWithActiveRouteStyles>
        </div>
      </nav>

      <main className="grid h-screen place-items-center text-3xl md:text-4xl">
        {children}
      </main>
    </div>
  );
}
