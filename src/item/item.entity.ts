import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity({ name: 'item' })
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Unique(['name'])
  name: string;

  @Column({ default: 0 })
  quantity: number;
}
