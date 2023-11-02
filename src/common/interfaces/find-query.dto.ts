import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { SortOrder } from 'mongoose';

export class FindQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  sortBy: string;

  @ApiProperty({ required: false })
  @IsOptional()
  order: SortOrder;

  @ApiProperty({ required: false })
  @IsOptional()
  limit: number;

  @ApiProperty({ required: false })
  @IsOptional()
  skip: number;

  @ApiProperty({ required: false })
  @IsOptional()
  _id: string;
}
