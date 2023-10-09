import { Controller, Post, Body, Get, Param, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { Response } from 'express';

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
}
