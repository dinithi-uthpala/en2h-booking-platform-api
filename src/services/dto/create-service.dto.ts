import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({
    example: 'Hair Cut',
    description: 'Title of the service',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    example: 'Basic haircut service',
    description: 'Detailed description of the service',
  })
  @IsString()
  @MinLength(5)
  description!: string;

  @ApiProperty({
    example: 45,
    description: 'Service duration in minutes',
  })
  @IsNumber()
  @IsPositive()
  duration!: number;

  @ApiProperty({
    example: 1800,
    description: 'Service price',
  })
  @IsNumber()
  @IsPositive()
  price!: number;

  @ApiPropertyOptional({
    example: true,
    description: 'Whether the service is currently active',
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}