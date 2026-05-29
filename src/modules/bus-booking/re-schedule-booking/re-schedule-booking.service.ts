import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { GenericResponse, errorResponse, sendResponse } from '@common/http/response';
import { daily } from '@common/decorators';
import { BookingStatusEnum } from '@common/enums/booking.enum';

@Injectable()
export class ReRescheduleBookingService {
  @daily()
  private ormEntity({ ...options }): any {
    return options.return(options);
  }

  @daily()
  private closeConnection({ ...options }): any {
    return options.return(options);
  }

  private key: string;

  async rescheduleBooking(userId: string, bookingId: string, dto: any, user: any): Promise<GenericResponse<any>> {
    try {
      
      const dynamic = await this.ormEntity({ database: user.locationId, entities: ['BookingHistoryEntity'] });
      this.key = dynamic['key'];
      const bookingRepo = dynamic['BookingHistoryEntity'];

      const existing = await bookingRepo.findOne({ where: { bookingId } });
      if (!existing) {
        return errorResponse(HttpStatus.NOT_FOUND, 'Booking not found');
      }

      // mark existing as RESCHEDULED
      existing.status = BookingStatusEnum.RESCHEDULED;
      await bookingRepo.save(existing);

      // create new booking record referencing previous booking
      const newBookingId = `BKG${Date.now()}`;
      const payload = {
        bookingId: newBookingId,
        passengerId: existing.passengerId,
        fromCity: existing.fromCity,
        toCity: existing.toCity,
        journeyDate: dto.journeyDate,
        seatNumber: existing.seatNumber ?? null,
        amount: existing.amount,
        paymentMode: existing.paymentMode ?? null,
        paymentStatus: existing.paymentStatus ?? 'PENDING',
        status: BookingStatusEnum.BOOKED,
        rescheduledFromBookingId: existing.bookingId,
      };

      const newBooking = bookingRepo.create(payload);
      const saved = await bookingRepo.save(newBooking);

      return sendResponse('Booking rescheduled', { bookingId: saved.bookingId }, HttpStatus.OK);
    } catch (error) {
      Logger.error('Reschedule Booking Error', error instanceof Error ? error.stack : JSON.stringify(error));
      return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, 'Failed to reschedule booking', (error as any)?.message ?? String(error));
    } finally {
      await this.closeConnection({ database: this.key });
    }
  }
}



