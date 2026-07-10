import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateServiceDto {
  @ApiPropertyOptional({
    example: 'Hair Cut - Premium',
    description: 'Updated service title',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    example: 'Premium haircut and styling service',
    description: 'Updated service description',
  })
  @IsString()
  @MinLength(5)
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    example: 60,
    description: 'Updated service duration in minutes',
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  duration?: number;

  @ApiPropertyOptional({
    example: 2500,
    description: 'Updated service price',
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({
    example: true,
    description: 'Updated service active status',
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}