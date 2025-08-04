import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class WsAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const client: Socket = context.switchToWs().getClient<Socket>();
    
    // In a real implementation, you'd validate the JWT token
    // For now, we'll just extract user info from the auth data
    const auth = client.handshake.auth;
    
    if (auth && auth.token) {
      // Mock user extraction - in real implementation, decode JWT
      client.data.userId = auth.userId || 'user-123';
      client.data.userName = auth.userName || 'Test User';
      return true;
    }
    
    return false;
  }
}