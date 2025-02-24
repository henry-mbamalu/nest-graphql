import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sender: string;

  @Column()
  text: string;

  @Column()
  room: string;

  @Column()
  timestamp: string;

  @CreateDateColumn()
  createdAt: Date;
}
