import { ImageResponse } from 'next/og';
import { categories } from '../../../categories';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('id');

    if (!categoryId) {
      return new Response('Category ID required', { status: 400 });
    }

    const category = categories.find(cat => cat.id === categoryId);

    if (!category) {
      return new Response('Category not found', { status: 404 });
    }

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
              justifyContent: 'center',
              marginBottom: '48px',
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
          </div>

          {/* Category Icon & Name */}
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
                background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
                borderRadius: '24px',
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '200px',
                height: '200px',
              }}
            >
              {category.icon}
            </div>
            <div
              style={{
                fontSize: '72px',
                fontWeight: '800',
                textAlign: 'center',
                maxWidth: '1000px',
                lineHeight: '1.1',
                background: 'linear-gradient(45deg, #ffffff, #e2e8f0)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {category.name}
            </div>
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
            {category.description}
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