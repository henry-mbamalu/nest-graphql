import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const client: Socket = context.switchToWs().getClient();

    // Get token from headers
    const authHeader = client.handshake?.auth?.token || client.handshake.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token missing or invalid format');
    }

    const token = authHeader.split(' ')[1]; // Extract token after 'Bearer'

    try {
      // Verify and attach user data
      const payload = this.jwtService.verify(token);
      
      client.data.user = payload; // Attach user data to the WebSocket client
      return true;
    } catch (err) {
        console.log(err)
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
