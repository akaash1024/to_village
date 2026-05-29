import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateBookingReqDto } from '../dto/create-booking.req.dto';
import { GenericResponse, errorResponse, sendResponse } from '@common/http/response';
import { daily } from '@common/decorators';

@Injectable()
export class BookingService {
    @daily()
    private ormEntity({ ...options }): any {
        return options.return(options);
    }

    @daily()
    private closeConnection({ ...options }): any {
        return options.return(options);
    }

    private connectionKey: string;

    async createBooking(userId: string, dto: CreateBookingReqDto, user: any): Promise<GenericResponse<any>> {
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

            return sendResponse('Booking created', { bookingId: saved.bookingId }, HttpStatus.CREATED);
        } catch (error) {
            Logger.error('Create Booking Error', error instanceof Error ? error.stack : JSON.stringify(error));
            return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, 'Failed to create booking', (error as any)?.message ?? String(error));
        } finally {
            await this.closeConnection({ database: this.connectionKey });
        }
    }
}



