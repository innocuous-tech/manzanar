'use client';

import { IchiroStatement } from '@/app/(experience)/_components/IchiroStatement';
import { UserStatement } from '@/app/(experience)/_components/UserStatement';
import { DialogContent } from '@/components/Dialog';

export type Transcript = { origin: 'user' | 'ichiro'; message: string }[];

interface TranscriptDialogContentProps {
  transcript: Transcript;
}

export const TranscriptDialogContent = ({
  transcript,
}: TranscriptDialogContentProps) => (
  <DialogContent>
    <ol className="typography-button flex flex-col gap-6">
      {transcript.map(({ origin, message }, index) => (
        <li key={`${message}_${index}`}>
          {origin === 'user' ? (
            <UserStatement>{message}</UserStatement>
          ) : (
            <IchiroStatement>{message}</IchiroStatement>
          )}
        </li>
      ))}
    </ol>
  </DialogContent>
);
