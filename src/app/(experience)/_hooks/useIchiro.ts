'use client';

import {
  SetIchiroVariant,
  getIchiroResponseVariant,
} from '@/components/IchiroAvatar';
import type {
  HistoryItem,
  InworldConnectionService,
  InworldPacket,
} from '@inworld/web-sdk';
import va from '@vercel/analytics';
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
  setIchiroVariant,
  setTranscript,
  setVisibleStatement,
}: {
  messageToSend: string;
  setIchiroVariant: SetIchiroVariant;
  setTranscript: Dispatch<
    SetStateAction<
      {
        origin: 'user' | 'ichiro';
        message: string;
      }[]
    >
  >;
  setVisibleStatement: Dispatch<
    SetStateAction<{
      origin: 'user' | 'ichiro';
      message: string;
    }>
  >;
}) {
  const hasRenderedRef = useRef(false);

  const [retryCount, setRetryCount] = useState<number>(0);
  const [response, setResponse] = useState<string[]>([]);
  const [hasResponse, setHasResponse] = useState<boolean>(false);

  useEffect(() => {
    if (!hasRenderedRef.current) {
      const askIchiro = async () => {
        let firstResponse: string | null = null;

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
              .setGenerateSessionToken(this.generateSessionToken) // eslint-disable-line @typescript-eslint/unbound-method
              .setOnError((error) => {
                if (retryCount < 3) {
                  setRetryCount((prev) => prev + 1);
                  this.connection.sendText(messageToSend);
                } else {
                  va.track('Inworld Error', {
                    errorName: error.name,
                    errorStack: error.stack ?? '',
                    errorMessage: error.message,
                  });
                }
              })
              .setOnHistoryChange(props.onHistoryChange)
              .setOnMessage((packet) => {
                props.onMessage(packet);
                if (packet.isInteractionEnd()) this.connection.close();
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
            if ('text' in message) {
              let text = message.text.text;

              if (text) {
                const hasMidSentenceUserName =
                  !text.startsWith(userName) && text.includes(userName);

                if (hasMidSentenceUserName) {
                  text = text.replace(userName, userName.toLocaleLowerCase());
                }

                const ichiroStatement = {
                  origin: 'ichiro' as const,
                  message: text,
                };

                if (!firstResponse) {
                  firstResponse = text;
                  const shouldPoint =
                    text.includes('You') || text.includes(' you');

                  setIchiroVariant(getIchiroResponseVariant({ shouldPoint }));
                  setVisibleStatement(ichiroStatement);

                  setResponse((prev) => prev.slice(1)); // [1, 2, 3] --> [2, 3]
                } else {
                  setResponse((prev) => [...prev, text]);
                }

                setTranscript((prev) => [...prev, ichiroStatement]);
              }
            }

            if ('control' in message) {
              // Weird import path. Don't want to resolve this lint error and blow up bundle.
              // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
              const isFinal = message.control.type === 'INTERACTION_END';

              if (isFinal) {
                setHasResponse(true);
              }
            }
          },
        });

        await service.connection.sendText(messageToSend);
      };

      askIchiro();
    }

    hasRenderedRef.current = true;
  }, [
    messageToSend,
    response,
    retryCount,
    setIchiroVariant,
    setTranscript,
    setVisibleStatement,
  ]);

  return { response, setResponse, hasResponse };
}
