import { Controller, Post, Body, Get, Param, Res, Put } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dtos/create-item.dto';
import { Response } from 'express';
import { UpdateItemDto } from './dtos/update-item.dto';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  async createItem(@Body() createItemDto: CreateItemDto, @Res() res: Response) {
    const item = await this.itemService.create(createItemDto);
    return res.json({ data: item, success: true });
  }

  @Get()
  async findAll(@Res() res: Response) {
    const items = await this.itemService.findAll();
    return res.json({ data: items, success: true });
  }

  @Get(':name')
  async findItem(@Param('name') name: string, @Res() res: Response) {
    const item = await this.itemService.findItem(name);
    return res.json({ data: item, success: true });
  }

  @Put(':name')
  async updateItem(
    @Param('name') name: string,
    @Body() dto: UpdateItemDto,
    @Res() res: Response,
  ) {
    const item = await this.itemService.update(name, dto);
    return res.json({ data: item, success: true });
  }
}
