import {
  HistoryItem,
  InworldClient,
  InworldConnectionService,
  InworldPacket,
} from '@inworld/web-sdk';

interface InworldServiceProps {
  id: string;
  onHistoryChange?: (history: HistoryItem[]) => void;
  onMessage: (packet: InworldPacket) => void;
  onReady?: () => void;
  onDisconnect?: () => void;
}

export const userName = 'Mister';

export class InworldService {
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
      .setUser({ fullName: userName, id: props.id })
      .setScene(process.env.NEXT_PUBLIC_INWORLD_SCENE!)
      .setGenerateSessionToken(this.generateSessionToken)
      .setOnError((err) => console.log(err))
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
