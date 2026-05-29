import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateBookingReqDto } from '../dto/create-booking.req.dto';
import { GenericResponse, errorResponse, sendResponse } from '@common/http/response';
import { daily } from '@common/decorators';
import { BookingActivityLogService } from '../booking-activity-log/booking-activity-log.service';
import { Locations } from '@entities/location';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingStatusEnum, PaymentStatusEnum } from '@common/enums/booking.enum';

@Injectable()
export class BookingService {

    constructor(
        private readonly bookingActivityLogService: BookingActivityLogService,

        @InjectRepository(Locations)
        private readonly locationRepo: Repository<Locations>,
    ) { }


    @daily()
    private ormEntity({ ...options }): any {
        return options.return(options);
    }

    @daily()
    private closeConnection({ ...options }): any {
        return options.return(options);
    }

    private connectionKey: string;

    async createBooking(userId: string, dto: CreateBookingReqDto, user: any) {
        try {

            const dynamic = await this.ormEntity({
                database: user.locationId,
                entities: ['BookingHistoryEntity'],
            });

            this.connectionKey = dynamic['key'];

            const bookingRepo: Repository<any> = dynamic['BookingHistoryEntity'];


            const bookingId = `BKG${Date.now()}`;

            const payload = {
                bookingId,
                passengerId: dto.passengerId,
                fromCity: dto.fromCity,
                toCity: dto.toCity,
                journeyDate: dto.journeyDate,
                seatNumber: dto.seatNumber ?? null,
                amount: dto.amount,
                paymentMode: dto.paymentMode ?? null,
                paymentStatus: 'PENDING',
                status: 'BOOKED',
            };

            const booking = bookingRepo.create(payload);
            const saved = await bookingRepo.save(booking);


            await this.bookingActivityLogService.createBookingActivityLog(
                {
                    bookingId: saved.bookingId,
                    bookingStatus: BookingStatusEnum.BOOKED,
                    paymentStatus: PaymentStatusEnum.PENDING,
                    paymentMode: dto.paymentMode,
                    locationId: user.locationId,
                    remarks: 'Booking created',
                }
            );


            return sendResponse('Booking created', { bookingId: saved.bookingId }, HttpStatus.CREATED);
        } catch (error) {
            Logger.error('Create Booking Error', error instanceof Error ? error.stack : JSON.stringify(error));
            return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, 'Failed to create booking', (error as any)?.message ?? String(error));
        } finally {
            await this.closeConnection({ database: this.connectionKey });
        }
    }
}



