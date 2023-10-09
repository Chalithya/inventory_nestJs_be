import { IsNumber, IsString } from 'class-validator';

export class UpdateItemDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly quantity: number;
}
