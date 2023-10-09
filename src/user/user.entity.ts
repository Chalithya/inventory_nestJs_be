import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Unique(['username'])
  username: string;

  @Column()
  password: string;

  @Column({ default: 'Viewer' })
  role: string;

  @Column({ default: false })
  isDisabled: boolean;
}
