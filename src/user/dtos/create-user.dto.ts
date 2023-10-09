import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

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
  readonly role: string;

  @IsBoolean()
  readonly isDisabled: boolean;
}
