import { ContinueButton } from '@/app/(experience)/_components/ContinueButton';
import { useIchiro } from '@/app/(experience)/_hooks/useIchiro';
import { IchiroStatement } from '@/app/(experience)/experience/ichiro/IchiroStatement';
import { UserStatement } from '@/app/(experience)/experience/ichiro/UserStatement';
import { cms } from '@/cms';
import { Dispatch, SetStateAction, useState } from 'react';

interface Q27Props {
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

export const Q27 = ({ setTranscript, onComplete }: Q27Props) => {
  const [visibleStatement, setVisibleStatement] = useState<{
    source: 'user' | 'ichiro';
    message: string;
  }>({
    source: 'user',
    message: cms.q27,
  });

  const { hasResponse, response, setResponse } = useIchiro({
    messageToSend: cms.q27,
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
