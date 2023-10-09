import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const { username, role, isDisabled, password } = dto;

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const newUser = this.userRepository.create({
        username,
        role,
        isDisabled,
        password: hashedPassword,
      });

      const savedUser = await this.userRepository.save(newUser);

      const userWithoutPassword = { ...savedUser };
      delete userWithoutPassword.password;
      return userWithoutPassword;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Username already exists');
      }
      throw error;
    }
  }

  async findAll() {
    try {
      const users = await this.userRepository.find();

      const usersWithoutPassword = users.map((user) => {
        const userCopy = { ...user };
        delete userCopy.password;
        return userCopy;
      });

      return usersWithoutPassword;
    } catch (error) {
      throw error;
    }
  }

  async findUser(username: string) {
    try {
      const user = await this.userRepository.findOne({ where: { username } });

      const userWithoutPassword = { ...user };
      delete userWithoutPassword.password;

      return userWithoutPassword;
    } catch (error) {
      throw error;
    }
  }

  async login(username: string, password: string) {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = jwt.sign(
      { sub: user.id, username: user.username },
      'secretsecretsecretsecretsecretsecret',
      {
        expiresIn: '1h',
      },
    );

    const { password: _, ...userWithoutPassword } = user;

    return { token, user: userWithoutPassword };
  }
}
