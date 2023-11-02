import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: '' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '' })
  @IsNotEmpty()
  password: string;
}
