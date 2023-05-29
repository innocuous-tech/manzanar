import { ContinueButton } from '@/app/(experience)/_components/ContinueButton';
import { useIchiro } from '@/app/(experience)/_hooks/useIchiro';
import { IchiroStatement } from '@/app/(experience)/experience/ichiro/IchiroStatement';
import { UserStatement } from '@/app/(experience)/experience/ichiro/UserStatement';
import { Dispatch, SetStateAction, useState } from 'react';

interface QCustomProps {
  message: string;
  onComplete: () => void;
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
  setTranscript,
  onComplete,
  message,
}: QCustomProps) => {
  const [visibleStatement, setVisibleStatement] = useState<{
    source: 'user' | 'ichiro';
    message: string;
  }>({
    source: 'user',
    message: message,
  });

  const { hasResponse, response, setResponse } = useIchiro({
    messageToSend: message,
    setTranscript,
  });

  return (
    <>
      <div />

      <section className="bottom-panel">
        {visibleStatement.source === 'user' && (
          <UserStatement>{visibleStatement.message}</UserStatement>
        )}
        {visibleStatement.source === 'ichiro' && (
          <IchiroStatement>{visibleStatement.message}</IchiroStatement>
        )}

        {hasResponse && (
          <ContinueButton
            onClick={() => {
              if (response.length === 0) {
                onComplete();
              } else {
                setVisibleStatement({
                  source: 'ichiro',
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
