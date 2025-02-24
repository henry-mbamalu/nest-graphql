import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { Message } from './message.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [TypeOrmModule.forFeature([Message]), 
    JwtModule.register({
        secret: process.env.JWT_SECRET || 'supersecret',
        signOptions: { expiresIn: '24h' },
    }),],
    providers: [ChatGateway, ChatService],
})
export class ChatModule { }
