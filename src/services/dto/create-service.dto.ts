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
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @MinLength(5)
  description!: string;

  @IsNumber()
  @IsPositive()
  duration!: number;

  @IsNumber()
  @IsPositive()
  price!: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}