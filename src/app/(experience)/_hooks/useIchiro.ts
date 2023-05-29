'use client';

import type {
  HistoryItem,
  InworldConnectionService,
  InworldPacket,
} from '@inworld/web-sdk';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

interface InworldServiceProps {
  onHistoryChange?: (history: HistoryItem[]) => void;
  onMessage: (packet: InworldPacket) => void;
  onReady?: () => void;
  onDisconnect?: () => void;
}

const userName = 'Mister';
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
      const askIchiro = async () => {
        const { InworldClient } = await import('@inworld/web-sdk');

        class InworldService {
          connection: InworldConnectionService;

          constructor(props: InworldServiceProps) {
            const client = new InworldClient()
              .setConfiguration({
                capabilities: {
                  emotions: true,
                  audio: false,
                  phonemes: false,
                  silence: false,
                  interruptions: false,
                  narratedActions: false,
                },
              })
              .setUser({ fullName: userName, id })
              .setScene(process.env.NEXT_PUBLIC_INWORLD_SCENE!)
              .setGenerateSessionToken(this.generateSessionToken)
              .setOnError((err) => console.log(err))
              .setOnHistoryChange(props.onHistoryChange)
              .setOnMessage((packet) => {
                props.onMessage(packet);
                if (packet.isInteractionEnd()) this.connection?.close();
              })
              .setOnReady(props.onReady)
              .setOnDisconnect(props.onDisconnect);

            this.connection = client.build();
          }

          private async generateSessionToken() {
            const response = await fetch('/api/initInworld');

            return response.json();
          }
        }

        const service = new InworldService({
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

        await service.connection?.isActive();
        await service.connection?.sendText(messageToSend);
      };

      askIchiro();
    }

    hasRenderedRef.current = true;
  }, [messageToSend, setTranscript]);

  return { response, setResponse, hasResponse };
}
