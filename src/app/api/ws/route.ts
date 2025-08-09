import { NextRequest } from 'next/server';

// This route will handle WebSocket upgrade requests
export async function GET(request: NextRequest) {
  // For now, return a message that WebSocket connections should go through the custom server
  return new Response(
    JSON.stringify({ 
      message: 'WebSocket connections are handled by the custom server',
      websocketUrl: process.env.NEXT_PUBLIC_WS_URL || `ws://localhost:3002`
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}