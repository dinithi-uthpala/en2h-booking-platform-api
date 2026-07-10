import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BookingStatus, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { QueryBookingDto } from './dto/query-booking.dto';

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBookingDto: CreateBookingDto) {
    const service = await this.prisma.service.findUnique({
      where: {
        id: createBookingDto.serviceId,
      },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    if (!service.isActive) {
      throw new BadRequestException('Service is not active');
    }

    const bookingDate = new Date(createBookingDto.bookingDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (bookingDate < today) {
      throw new BadRequestException('Booking date cannot be in the past');
    }

    const existingBooking = await this.prisma.booking.findUnique({
      where: {
        serviceId_bookingDate_bookingTime: {
          serviceId: createBookingDto.serviceId,
          bookingDate,
          bookingTime: createBookingDto.bookingTime,
        },
      },
    });

    if (existingBooking) {
      throw new ConflictException(
        'A booking already exists for this service, date, and time',
      );
    }

    return this.prisma.booking.create({
      data: {
        customerName: createBookingDto.customerName,
        customerEmail: createBookingDto.customerEmail,
        customerPhone: createBookingDto.customerPhone,
        serviceId: createBookingDto.serviceId,
        bookingDate,
        bookingTime: createBookingDto.bookingTime,
        notes: createBookingDto.notes,
      },
      include: {
        service: true,
      },
    });
  }

  async findAll(query: QueryBookingDto) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const where: Prisma.BookingWhereInput = {};

    if (query.status) {
      where.status = query.status;
    }

    if (query.search) {
      where.OR = [
        {
          customerName: {
            contains: query.search,
          },
        },
        {
          customerEmail: {
            contains: query.search,
          },
        },
        {
          customerPhone: {
            contains: query.search,
          },
        },
      ];
    }

    const [bookings, total] = await Promise.all([
      this.prisma.booking.findMany({
        where,
        include: {
          service: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      this.prisma.booking.count({
        where,
      }),
    ]);

    return {
      data: bookings,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const booking = await this.prisma.booking.findUnique({
      where: {
        id,
      },
      include: {
        service: true,
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    return booking;
  }

  async updateStatus(id: number, updateStatusDto: UpdateBookingStatusDto) {
    const booking = await this.findOne(id);

    if (
      booking.status === BookingStatus.CANCELLED &&
      updateStatusDto.status === BookingStatus.COMPLETED
    ) {
      throw new BadRequestException(
        'Cancelled bookings cannot be marked as completed',
      );
    }

    return this.prisma.booking.update({
      where: {
        id,
      },
      data: {
        status: updateStatusDto.status,
      },
      include: {
        service: true,
      },
    });
  }

  async cancel(id: number) {
    await this.findOne(id);

    return this.prisma.booking.update({
      where: {
        id,
      },
      data: {
        status: BookingStatus.CANCELLED,
      },
      include: {
        service: true,
      },
    });
  }
}