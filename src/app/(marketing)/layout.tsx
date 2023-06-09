import { LinkWithActiveRouteStyles } from '@/components/LinkWithActiveRouteStyles';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

export default function MarketingLayout({ children }: PropsWithChildren) {
  return (
    <div className="text-cream">
      <nav className="absolute left-0 right-0 top-0 flex items-center justify-between gap-4 px-8 py-8 text-lg md:text-3xl lg:gap-6 lg:px-[6rem] lg:py-14 lg:text-xl">
        <div>
          <Link href="/" className="uppercase">
            Moment in Manzanar
          </Link>
        </div>

        <div className="flex items-center justify-between gap-4 lg:gap-12">
          <LinkWithActiveRouteStyles href="/about">
            About
          </LinkWithActiveRouteStyles>

          <LinkWithActiveRouteStyles href="/team">
            Team
          </LinkWithActiveRouteStyles>
        </div>
      </nav>

      <main className="grid place-items-start text-3xl h-view md:text-4xl">
        {children}
      </main>
    </div>
  );
}
