import { InworldClient } from '@inworld/nodejs-sdk';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export async function GET() {
  const client = new InworldClient().setApiKey({
    key: process.env.INWORLD_KEY!,
    secret: process.env.INWORLD_SECRET!,
  });

  const token = await client.generateSessionToken();

  return new Response(JSON.stringify(token));
}
