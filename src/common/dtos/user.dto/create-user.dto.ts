import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsOptional()
  password: string;

  @ApiProperty()
  @IsOptional()
  role: string;

  @ApiProperty()
  @IsOptional()
  createdAt: Date;
}
