import { ContinueButton } from '@/app/(experience)/_components/ContinueButton';
import { IchiroStatement } from '@/app/(experience)/_components/IchiroStatement';
import { UserStatement } from '@/app/(experience)/_components/UserStatement';
import { useIchiro } from '@/app/(experience)/_hooks/useIchiro';
import { SetIchiroVariant } from '@/components/IchiroAvatar';
import { Dispatch, SetStateAction, useState } from 'react';

interface QCustomProps {
  message: string;
  onComplete: () => void;
  setIchiroVariant: SetIchiroVariant;
  setTranscript: Dispatch<
    SetStateAction<
      {
        origin: 'user' | 'ichiro';
        message: string;
      }[]
    >
  >;
}

export const QCustom = ({
  setIchiroVariant,
  setTranscript,
  onComplete,
  message,
}: QCustomProps) => {
  const [visibleStatement, setVisibleStatement] = useState<{
    origin: 'user' | 'ichiro';
    message: string;
  }>({
    origin: 'user',
    message: message,
  });

  const { hasResponse, response, setResponse } = useIchiro({
    messageToSend: message,
    setIchiroVariant,
    setTranscript,
    setVisibleStatement,
  });

  return (
    <>
      <div />

      <section className="bottom-panel">
        {visibleStatement.origin === 'user' && (
          <UserStatement>{visibleStatement.message}</UserStatement>
        )}
        {visibleStatement.origin === 'ichiro' && (
          <IchiroStatement>{visibleStatement.message}</IchiroStatement>
        )}

        {hasResponse && (
          <ContinueButton
            onClick={() => {
              if (response.length === 0) {
                onComplete();
              } else {
                setVisibleStatement({
                  origin: 'ichiro',
                  message: response[0],
                });

                // [1, 2, 3] --> [2, 3]
                setResponse((prev) => prev.slice(1));
              }
            }}
          />
        )}
      </section>
    </>
  );
};
