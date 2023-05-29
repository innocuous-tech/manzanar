import { InworldService, userName } from '@/InworldClient';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

const id = `${Math.random()}`;

export function useIchiro({
  messageToSend,
  setTranscript,
}: {
  messageToSend: string;
  setTranscript: Dispatch<
    SetStateAction<
      {
        origin: 'user' | 'ichiro';
        message: string;
      }[]
    >
  >;
}) {
  const hasRenderedRef = useRef(false);

  const [response, setResponse] = useState<string[]>([]);
  const [hasResponse, setHasResponse] = useState<boolean>(false);

  useEffect(() => {
    if (!hasRenderedRef.current) {
      const askIchiroQ27 = async () => {
        const service = new InworldService({
          id,
          onMessage: (message) => {
            let text = message?.text?.text;

            if (text) {
              const hasMidSentenceUserName =
                !text.startsWith(userName) && text.includes(userName);

              if (hasMidSentenceUserName) {
                text = text.replace(userName, userName.toLocaleLowerCase());
              }

              setTranscript((prev) => [
                ...prev,
                { origin: 'ichiro', message: text },
              ]);

              setResponse((prev) => [...prev, text]);
            }

            const isFinal = message?.control?.type === 'INTERACTION_END';
            if (isFinal) setHasResponse(true);
          },
        });

        await service.connection.isActive();
        await service.connection.sendText(messageToSend);
      };

      askIchiroQ27();
    }

    hasRenderedRef.current = true;
  }, [messageToSend, setTranscript]);

  return { response, setResponse, hasResponse };
}
