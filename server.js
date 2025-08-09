const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');
const { createProxyMiddleware } = require('http-proxy-middleware');

// Function to decode JWT payload without verification (for extracting userId)
function decodeJWT(token) {
  try {
    const base64Payload = token.split('.')[1];
    const payload = Buffer.from(base64Payload, 'base64').toString('utf-8');
    return JSON.parse(payload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}

// Function to parse cookies from cookie header
function parseCookies(cookieHeader) {
  const cookies = {};
  if (cookieHeader) {
    cookieHeader.split(';').forEach(cookie => {
      const [name, value] = cookie.trim().split('=');
      if (name && value) {
        cookies[name] = decodeURIComponent(value);
      }
    });
  }
  return cookies;
}

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3002;
const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';

// Create Next.js app
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      // Handle backend API proxy
      if (pathname.startsWith('/api/backend/')) {
        const proxyPath = pathname.replace('/api/backend', '');
        const target = `${backendUrl}${proxyPath}`;
        
        // Create proxy middleware
        const proxy = createProxyMiddleware({
          target: backendUrl,
          changeOrigin: true,
          pathRewrite: {
            '^/api/backend': '', // Remove /api/backend prefix
          },
          onError: (err, req, res) => {
            console.error('Proxy error:', err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Proxy error');
          },
        });

        return proxy(req, res);
      }

      // Handle all other requests with Next.js
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  // Create Socket.IO server
  const io = new Server(server, {
    cors: {
      origin: process.env.NEXT_PUBLIC_FRONTEND_URL || `http://localhost:${port}`,
      credentials: true,
    },
  });

  // Proxy Socket.IO connections to backend
  io.on('connection', (socket) => {
    console.log('Client connected to Next.js proxy:', socket.id);
    console.log('Socket handshake headers:', socket.handshake.headers);
    console.log('Socket handshake query:', socket.handshake.query);

    // Extract userId from JWT token in cookies
    let userId = socket.handshake.query.userId;
    
    if (!userId) {
      const cookieHeader = socket.handshake.headers.cookie;
      console.log('Cookie header:', cookieHeader);
      
      const cookies = parseCookies(cookieHeader);
      console.log('Parsed cookies:', cookies);
      
      const accessToken = cookies.access_token;
      console.log('Access token found:', !!accessToken);
      
      if (accessToken) {
        const payload = decodeJWT(accessToken);
        console.log('JWT payload:', payload);
        if (payload && payload.sub) {
          userId = payload.sub; // JWT 'sub' claim typically contains the user ID
          console.log('Extracted userId from JWT:', userId);
        }
      }
    }
    
    // Disconnect if no valid userId found
    if (!userId) {
      console.log('No userId found, disconnecting client:', socket.id);
      socket.disconnect();
      return;
    }

    // Create connection to backend WebSocket server
    const backendSocket = require('socket.io-client')(`${backendUrl}/game`, {
      query: { 
        ...socket.handshake.query,
        userId: userId
      },
      auth: socket.handshake.auth,
      transports: ['websocket', 'polling'],
      forceNew: true,
    });

    // Forward events from client to backend
    const clientEvents = [
      'create_game',
      'join_game',
      'game_action',
      'leave_game',
      'get_available_games',
      'get_player_stats'
    ];

    clientEvents.forEach(event => {
      socket.on(event, (data, callback) => {
        console.log(`Proxying ${event} from client to backend`);
        backendSocket.emit(event, data, (response) => {
          if (callback) callback(response);
        });
      });
    });

    // Forward events from backend to client
    const backendEvents = [
      'connected',
      'disconnected',
      'game_created',
      'game_started',
      'game_action_result',
      'game_ended',
      'player_left',
      'game_no_longer_available',
      'error'
    ];

    backendEvents.forEach(event => {
      backendSocket.on(event, (data) => {
        console.log(`Forwarding ${event} from backend to client`);
        socket.emit(event, data);
      });
    });

    // Handle disconnection
    socket.on('disconnect', (reason) => {
      console.log('Client disconnected from proxy:', socket.id, reason);
      backendSocket.disconnect();
    });

    backendSocket.on('disconnect', (reason) => {
      console.log('Backend connection lost:', reason);
      socket.emit('backend_disconnected', { reason });
    });

    // Handle backend connection errors
    backendSocket.on('connect_error', (error) => {
      console.error('Backend connection error:', error);
      socket.emit('backend_error', { error: error.message });
    });
  });

  server
    .once('error', (err) => {
      console.error('Server error:', err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
      console.log(`> Proxying WebSocket connections to ${backendUrl}`);
    });
});