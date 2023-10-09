import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Res,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { Response } from 'express';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Roles } from 'src/utils/role.decorator';
import { UserRole } from './user-role.enum';
import { RoleGuard } from 'src/utils/role.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const user = await this.userService.create(createUserDto);
    return res.json({ data: user, success: true });
  }

  @Get()
  async findAll(@Res() res: Response) {
    const users = await this.userService.findAll();
    return res.json({ data: users, success: true });
  }

  @Get(':username')
  async findUser(@Param('username') username: string, @Res() res: Response) {
    const user = await this.userService.findUser(username);
    return res.json({ data: user, success: true });
  }

  @Post('login')
  async login(@Body() loginDto: LoginUserDto, @Res() res: Response) {
    const { username, password } = loginDto;
    const { token, user } = await this.userService.login(username, password);

    res.cookie('token', token, { httpOnly: true });
    return res.json({ data: user, success: true });
  }

  @Put(':username')
  @Roles(UserRole.Admin)
  @UseGuards(RoleGuard)
  async updateItem(
    @Param('username') username: string,
    @Body() dto: UpdateUserDto,
    @Res() res: Response,
  ) {
    const item = await this.userService.update(username, dto);
    return res.json({ data: item, success: true });
  }
}
