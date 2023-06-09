import { InvibleAssets } from '@/app/(marketing)/_components/InvibleAssets';
import { Button } from '@/components/Button';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 place-self-center text-center">
      <h1 className="px-3">
        {`Start your conversation with `}
        <span className="text-ichiro">Ichiro</span>
      </h1>

      <Link href="/experience/media/video-1">
        <Button>Start</Button>
      </Link>

      <InvibleAssets />
    </div>
  );
}
