import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async saveMessage(sender: string, text: string, room: string, timestamp: string): Promise<Message> {
    const message = this.messageRepository.create({ sender, text, room, timestamp });
    return await this.messageRepository.save(message);
  }

  async getLastMessages(room: string, limit: number = 50): Promise<Message[]> {
    return await this.messageRepository.find({
      where: { room },
      order: { timestamp: 'DESC' },
      take: limit,
    });
  }
}
