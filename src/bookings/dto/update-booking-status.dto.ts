import { ApiProperty } from '@nestjs/swagger';
import { BookingStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateBookingStatusDto {
  @ApiProperty({
    example: 'CONFIRMED',
    enum: BookingStatus,
    description: 'Booking status value',
  })
  @IsEnum(BookingStatus)
  status!: BookingStatus;
}