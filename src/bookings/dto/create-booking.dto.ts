import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({
    example: 'Kavindi Perera',
    description: 'Customer full name',
  })
  @IsString()
  @IsNotEmpty()
  customerName!: string;

  @ApiProperty({
    example: 'kavindi@test.com',
    description: 'Customer email address',
  })
  @IsEmail()
  customerEmail!: string;

  @ApiProperty({
    example: '0771234567',
    description: 'Customer phone number',
  })
  @IsString()
  @IsNotEmpty()
  customerPhone!: string;

  @ApiProperty({
    example: 1,
    description: 'ID of the service being booked',
  })
  @IsInt()
  serviceId!: number;

  @ApiProperty({
    example: '2026-07-15',
    description: 'Booking date. Past dates are not allowed.',
  })
  @IsDateString()
  bookingDate!: string;

  @ApiProperty({
    example: '10:30',
    description: 'Booking time',
  })
  @IsString()
  @IsNotEmpty()
  bookingTime!: string;

  @ApiPropertyOptional({
    example: 'First booking test',
    description: 'Optional notes for the booking',
  })
  @IsString()
  @IsOptional()
  notes?: string;
}