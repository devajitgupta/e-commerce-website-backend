import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class FilterProductDto  {
  @ApiProperty({ required: false })
  @IsOptional()
  rating?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  category?: string;

}
