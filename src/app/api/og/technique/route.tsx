import { ImageResponse } from 'next/og';
import { techniques } from '../../../techniques';
import { categories } from '../../../categories';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const techniqueId = searchParams.get('id');

    if (!techniqueId) {
      return new Response('Technique ID required', { status: 400 });
    }

    const technique = techniques.find(t => t.id === techniqueId);

    if (!technique) {
      return new Response('Technique not found', { status: 404 });
    }

    const category = categories.find(cat => cat.id === technique.category);

    const complexityColors = {
      low: '#10b981',
      medium: '#f59e0b',
      high: '#ef4444',
      'very-high': '#dc2626',
    };

    const complexityColor = complexityColors[technique.complexity as keyof typeof complexityColors] || '#64748b';

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
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '0 48px',
              position: 'absolute',
              top: '32px',
            }}
          >
            <div
              style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#64748b',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Agentic Design Patterns
            </div>
            {category && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '20px',
                  color: '#94a3b8',
                }}
              >
                <span style={{ marginRight: '8px' }}>{category.icon}</span>
                {category.name}
              </div>
            )}
          </div>

          {/* Technique Icon & Name */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '32px',
            }}
          >
            <div
              style={{
                fontSize: '120px',
                marginBottom: '24px',
                background: technique.color ? technique.color.replace('from-', 'linear-gradient(45deg, ').replace('to-', ', ') + ')' : 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
                borderRadius: '24px',
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '200px',
                height: '200px',
              }}
            >
              {technique.icon}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  fontSize: '64px',
                  fontWeight: '800',
                  textAlign: 'center',
                  lineHeight: '1.1',
                  background: 'linear-gradient(45deg, #ffffff, #e2e8f0)',
                  backgroundClip: 'text',
                  color: 'transparent',
                  marginRight: technique.abbr ? '16px' : '0',
                }}
              >
                {technique.name}
              </div>
              {technique.abbr && (
                <div
                  style={{
                    fontSize: '32px',
                    color: '#94a3b8',
                    fontWeight: '600',
                  }}
                >
                  ({technique.abbr})
                </div>
              )}
            </div>
            <div
              style={{
                fontSize: '18px',
                color: complexityColor,
                backgroundColor: complexityColor + '20',
                padding: '8px 16px',
                borderRadius: '999px',
                fontWeight: '600',
                textTransform: 'capitalize',
              }}
            >
              {technique.complexity} Complexity
            </div>
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: '24px',
              color: '#94a3b8',
              textAlign: 'center',
              maxWidth: '900px',
              lineHeight: '1.4',
              marginBottom: '48px',
            }}
          >
            {technique.description}
          </div>

          {/* Footer */}
          <div
            style={{
              position: 'absolute',
              bottom: '32px',
              right: '32px',
              display: 'flex',
              alignItems: 'center',
              fontSize: '20px',
              color: '#64748b',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
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