import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsOptional()
  price: string;

  @ApiProperty({ required: false })
  @IsOptional()
  category: string;

  @ApiProperty({ required: false })
  @IsOptional()
  image: string;

  @ApiProperty({ required: false })
  @IsOptional()
  stockQuantity: string;
}
