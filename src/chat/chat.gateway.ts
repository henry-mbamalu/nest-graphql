import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
    MessageBody,
    ConnectedSocket
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { WsAuthGuard } from 'src/guards/jwt-auth.guard';
import { UnauthorizedException, UseGuards } from '@nestjs/common';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private usersInRooms: Record<string, Set<string>> = {}; // Track users in rooms

    constructor(private readonly chatService: ChatService) { }

    async handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
    }

    async handleDisconnect(client: Socket) {
        this.leaveRoom(client);
        console.log(`Client disconnected: ${client.id}`);
    }

    @UseGuards(WsAuthGuard)
    @SubscribeMessage('joinRoom')
    async joinRoom(@ConnectedSocket() client: Socket, @MessageBody() data: { username: string; room: string }) {
        const { username, room } = data;
        const sender = client.data.user?.username;
        if (sender != username) {
            throw new UnauthorizedException('Invalid username');
        }

        client.join(room);
        client.data.room = room;
        client.data.username = username;

        if (!this.usersInRooms[room]) {
            this.usersInRooms[room] = new Set();
        }
        this.usersInRooms[room].add(username);

        this.server.to(room).emit('message', { event: 'message', data: `${username} joined the room` });
    }

    @UseGuards(WsAuthGuard)
    @SubscribeMessage('sendMessage')
    async sendMessage(@ConnectedSocket() client: Socket, @MessageBody() data: { sender: string, text: string, timestamp: string }) {
        const { sender, text, timestamp } = data
        const username = client.data.user?.username;
        if (sender != username) {
            throw new UnauthorizedException('Invalid username');
        }

        const room = client.data.room;
        console.log('room', room)
        if (!room) return;

        const message = await this.chatService.saveMessage(sender, text, room, timestamp);

        this.server.to(room).emit('message', {
            event: 'message',
            data: {
                sender: message.sender,
                text: message.text,
                timestamp: message.timestamp,
            },
        });
    }

    @UseGuards(WsAuthGuard)
    @SubscribeMessage('leaveRoom')
    async leaveRoom(@ConnectedSocket() client: Socket, @MessageBody() data?: { username?: string; room?: string }) {
        const room = data?.room || client.data.room;
        const username = data?.username || client.data.username;
        const sender = client.data.user?.username;
        if (sender != username) {
            throw new UnauthorizedException('Invalid username');
        }
        if (!room) return;

        client.leave(room);
        this.usersInRooms[room]?.delete(username);

        this.server.to(room).emit('message', { event: 'message', data: `${username} left the room` });
    }

    @UseGuards(WsAuthGuard)
    @SubscribeMessage('getMessages')
    async getMessages(@MessageBody() data: { room: string }) {
        const messages = await this.chatService.getLastMessages(data.room);

        return {
            event: 'messages',
            data: messages.reverse(), // Return in ascending order
        };
    }
}
