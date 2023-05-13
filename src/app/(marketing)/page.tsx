import { Button } from '@/components/Button';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center">
      <h1 className="">
        {`Start your conversation with `}
        <span className="text-ichiro">Ichiro</span>
      </h1>

      <Link href="/experience/ichiro/start">
        <Button>Start</Button>
      </Link>

      <Link href="/experience/media/video-1">
        <Button>Watch Video 1</Button>
      </Link>
    </div>
  );
}