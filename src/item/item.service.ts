import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Item } from './item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateItemDto } from './dtos/create-item.dto';
import { UpdateItemDto } from './dtos/update-item.dto';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
  ) {}

  async create(dto: CreateItemDto) {
    try {
      const newItem = this.itemRepository.create(dto);
      const savedItem = await this.itemRepository.save(newItem);

      return savedItem;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Item already exists');
      }
      throw error;
    }
  }

  async findAll() {
    try {
      const items = await this.itemRepository.find();
      return items;
    } catch (error) {
      throw error;
    }
  }

  async findItem(name: string) {
    try {
      const item = await this.itemRepository.findOne({ where: { name } });
      if (!item) {
        throw new NotFoundException('Item not found');
      }
      return item;
    } catch (error) {
      throw error;
    }
  }

  async update(name: string, dto: UpdateItemDto) {
    try {
      const item = await this.itemRepository.findOne({ where: { name } });

      if (!item) {
        throw new NotFoundException('Item not found');
      }

      Object.assign(item, dto);
      const savedItem = await this.itemRepository.save(item);

      return savedItem;
    } catch (error) {
      throw error;
    }
  }

  async delete(name: string) {
    try {
      const item = await this.itemRepository.findOne({ where: { name } });

      if (!item) {
        throw new NotFoundException('Item not found');
      }

      await this.itemRepository.remove(item);

      return item;
    } catch (error) {
      throw error;
    }
  }
}
