import { IsString, IsBoolean } from 'class-validator';
import { UserRole } from '../user-role.enum';

export class UpdateUserDto {
  @IsString()
  readonly username: string;

  @IsString()
  password: string;

  @IsString()
  readonly role: UserRole;

  @IsBoolean()
  readonly isDisabled: boolean;
}
