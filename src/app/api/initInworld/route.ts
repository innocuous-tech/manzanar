import { InworldClient } from '@inworld/nodejs-sdk';

export const revalidate = 60;
export const dynamic = 'force-dynamic';
export const runtime = 'edge';
export const preferredRegion = 'global';

export async function GET() {
  const client = new InworldClient().setApiKey({
    key: process.env.INWORLD_KEY!,
    secret: process.env.INWORLD_SECRET!,
  });

  const token = await client.generateSessionToken();

  return new Response(JSON.stringify(token));
}
