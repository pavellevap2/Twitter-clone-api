import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

ApiProperty();
export class CreateUserDto {
  @IsString()
  readonly login: string;

  @IsString()
  readonly password: string;
}
