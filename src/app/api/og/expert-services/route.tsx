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
            backgroundColor: '#0a0a0a',
            backgroundImage: 'radial-gradient(circle at 20% 30%, #fb923c33 0%, transparent 40%), radial-gradient(circle at 80% 70%, #f9731633 0%, transparent 40%)',
            color: 'white',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          {/* Header Badge */}
          <div
            style={{
              position: 'absolute',
              top: '48px',
              left: '48px',
              display: 'flex',
              alignItems: 'center',
              fontSize: '24px',
              color: '#fbbf24',
              fontWeight: '600',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #fbbf24, #f97316)',
                marginRight: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              🎯
            </div>
            Expert Services
          </div>

          {/* Main Icon */}
          <div
            style={{
              fontSize: '120px',
              marginBottom: '32px',
              background: 'linear-gradient(135deg, #fbbf24, #f97316)',
              borderRadius: '24px',
              padding: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '200px',
              height: '200px',
              boxShadow: '0 20px 60px rgba(251, 146, 60, 0.3)',
            }}
          >
            🎧
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: '72px',
              fontWeight: '900',
              textAlign: 'center',
              lineHeight: '1',
              background: 'linear-gradient(135deg, #fbbf24, #f97316)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: '24px',
              letterSpacing: '-2px',
            }}
          >
            Expert AI Services
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: '36px',
              fontWeight: '600',
              textAlign: 'center',
              lineHeight: '1.2',
              color: '#e5e5e5',
              marginBottom: '48px',
              maxWidth: '900px',
            }}
          >
            Consulting • Development • Mentoring
          </div>

          {/* Service Pills */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              marginBottom: '48px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              maxWidth: '1000px',
            }}
          >
            {['AI Strategy', 'Custom Agents', 'Architecture Review', 'Workshops', 'Technical Mentoring'].map((service) => (
              <div
                key={service}
                style={{
                  padding: '12px 24px',
                  borderRadius: '999px',
                  border: '2px solid rgba(251, 146, 60, 0.4)',
                  fontSize: '20px',
                  color: '#fef3c7',
                  background: 'rgba(251, 146, 60, 0.1)',
                }}
              >
                {service}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '28px',
              fontWeight: '700',
              color: '#fbbf24',
              padding: '20px 40px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.2), rgba(249, 115, 22, 0.2))',
              border: '2px solid rgba(251, 146, 60, 0.4)',
            }}
          >
            📅 Book Your Free Discovery Call
          </div>

          {/* Footer */}
          <div
            style={{
              position: 'absolute',
              bottom: '48px',
              display: 'flex',
              alignItems: 'center',
              fontSize: '22px',
              color: '#a3a3a3',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #fbbf24, #f97316)',
                marginRight: '12px',
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