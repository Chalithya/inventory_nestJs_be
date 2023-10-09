import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { UserRole } from '../user-role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  readonly id: number;

  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly role: UserRole;

  @IsBoolean()
  readonly isDisabled: boolean;
}
