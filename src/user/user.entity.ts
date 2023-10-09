import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { UserRole } from './user-role.enum';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Unique(['username'])
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.Viewer })
  role: UserRole;

  @Column({ default: false })
  isDisabled: boolean;
}
