import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { GenericResponse, errorResponse, sendResponse } from '@common/http/response';
import { daily } from '@common/decorators';

@Injectable()
export class CancellBookingService {
  @daily()
  private ormEntity({ ...options }): any {
    return options.return(options);
  }

  @daily()
  private closeConnection({ ...options }): any {
    return options.return(options);
  }

  private key: string;

  async cancelBooking(userId: string, bookingId: string, dto: any, user: any): Promise<GenericResponse<any>> {
    try {
      const dynamic = await this.ormEntity({ database: user.locationId, entities: ['BookingHistoryEntity'] });
      this.key = dynamic['key'];

      const bookingRepo = dynamic['BookingHistoryEntity'];

      const booking = await bookingRepo.findOne({ where: { bookingId } });
      if (!booking) {
        return errorResponse(HttpStatus.NOT_FOUND, 'Booking not found');
      }

      booking.status = 'CANCELLED';
      booking.cancelReason = dto.cancelReason ?? null;

      await bookingRepo.save(booking);

      return sendResponse('Booking cancelled successfully', { bookingId: booking.bookingId }, HttpStatus.OK);
    } catch (error) {
      Logger.error('Cancel Booking Error', error instanceof Error ? error.stack : JSON.stringify(error));
      return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, 'Failed to cancel booking', (error as any)?.message ?? String(error));
    } finally {
      await this.closeConnection({ database: this.key });
    }
  }
}



