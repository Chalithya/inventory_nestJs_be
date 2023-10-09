import { IsString, IsBoolean } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly role: string;

  @IsBoolean()
  readonly isDisabled: boolean;
}
