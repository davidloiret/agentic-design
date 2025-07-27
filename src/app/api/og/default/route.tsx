import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0f172a',
            backgroundImage: 'radial-gradient(circle at 25% 25%, #1e293b 0%, transparent 50%), radial-gradient(circle at 75% 75%, #1e293b 0%, transparent 50%)',
            color: 'white',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          {/* Main Logo/Icon */}
          <div
            style={{
              fontSize: '160px',
              marginBottom: '48px',
              background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
              borderRadius: '32px',
              padding: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '300px',
              height: '300px',
            }}
          >
            🧠
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: '80px',
              fontWeight: '900',
              textAlign: 'center',
              lineHeight: '1.1',
              background: 'linear-gradient(45deg, #ffffff, #e2e8f0)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: '24px',
            }}
          >
            Agentic Design
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: '48px',
              fontWeight: '700',
              textAlign: 'center',
              lineHeight: '1.2',
              background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: '32px',
            }}
          >
            Patterns & Techniques
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: '28px',
              color: '#94a3b8',
              textAlign: 'center',
              maxWidth: '900px',
              lineHeight: '1.4',
              marginBottom: '48px',
            }}
          >
            Comprehensive collection of AI agent design patterns, techniques, and best practices for building intelligent systems.
          </div>

          {/* Footer */}
          <div
            style={{
              position: 'absolute',
              bottom: '48px',
              display: 'flex',
              alignItems: 'center',
              fontSize: '24px',
              color: '#64748b',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
                marginRight: '16px',
              }}
            />
            agentic-design.ai
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}