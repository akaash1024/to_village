import { Injectable, HttpStatus, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';

import { GenericResponse, errorResponse, sendResponse } from '@common/http';
import { CommonMessages } from '@common/constants/messages/common.messages';

import { daily } from '@common/decorators';
import { CreateBookingJourneyLogDto } from './dto/booking-activity-log.dto';



@Injectable()
export class BookingActivityLogService {
  private readonly logger = new Logger(BookingActivityLogService.name);

  @daily()
  private ormEntity({ ...options }): any {
    return options.return(options);
  }

  @daily()
  private closeConnection({ ...options }): any {
    return options.return(options);
  }

  async createBookingActivityLog(
    dto: CreateBookingJourneyLogDto,
    req?: any,
  ) {
    let connectionKey: string = '';

    try {
      // -----------------------------
      // VALIDATION
      // -----------------------------
      if (!dto?.bookingId) {
        return errorResponse(
          HttpStatus.BAD_REQUEST,
          CommonMessages.INVALID_REQUEST,
          'bookingId is required',
        );
      }

      if (!dto?.bookingStatus) {
        return errorResponse(
          HttpStatus.BAD_REQUEST,
          CommonMessages.INVALID_REQUEST,
          'bookingStatus is required',
        );
      }

      if (!dto?.paymentStatus) {
        return errorResponse(
          HttpStatus.BAD_REQUEST,
          CommonMessages.INVALID_REQUEST,
          'paymentStatus is required',
        );
      }

      // -----------------------------
      // DB SETUP (multi-tenant)
      // -----------------------------
      

      const locationId = dto.locationId ?? req?.user?.locationId;

      if (!locationId) {
        return errorResponse(
          HttpStatus.BAD_REQUEST,
          CommonMessages.INVALID_REQUEST,
          'locationId is required',
        );
      }

      const connection = await this.ormEntity({
        database: locationId,
        entities: ['BookingHistoryEntity', 'BookingActivityLogEntity'],
      });

      connectionKey = connection?.key;

      const bookingRepo: Repository<any> = connection['BookingHistoryEntity'];
      const bookingLogRepo: Repository<any> = connection['BookingActivityLogEntity'];

      if (!bookingRepo || !bookingLogRepo) {
        throw new Error('Required entities not found');
      }

      // -----------------------------
      // CHECK BOOKING
      // -----------------------------
      const booking = await bookingRepo.findOne({
        where: {
          bookingId: dto.bookingId,
        },
      });

      if (!booking) {
        return errorResponse(
          HttpStatus.NOT_FOUND,
          CommonMessages.NOT_FOUND,
          'Booking not found',
        );
      }

      // -----------------------------
      // CREATE LOG ENTRY
      // -----------------------------
      const payload = {
        bookingId: dto.bookingId,
        bookingStatus: dto.bookingStatus,
        paymentStatus: dto.paymentStatus,
        paymentMode: dto.paymentMode ?? null,
        locationName: dto.locationId ?? null,
        remarks: dto.remarks ?? null,
      };

      const log = bookingLogRepo.create(payload);

      const savedLog = await bookingLogRepo.save(log);

      if (!savedLog) {
        throw new Error('Failed to create booking activity log');
      }

      // -----------------------------
      // RESPONSE
      // -----------------------------
      return sendResponse(
        'Booking activity log created successfully',
        {
          booking_log_id: String(savedLog.id),
          bookingId: savedLog.bookingId,
          bookingStatus: savedLog.bookingStatus,
          paymentStatus: savedLog.paymentStatus,
          paymentMode: savedLog.paymentMode,
          locationId: savedLog.locationId,
          locationName: savedLog.locationName,
          remarks: savedLog.remarks,
        },
        HttpStatus.CREATED,
      );
    } catch (error) {
      this.logger.error(
        `Error creating booking activity log: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );

      return errorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        CommonMessages.INTERNAL_ERROR,
        error instanceof Error ? error.message : String(error),
      );
    } finally {
      if (connectionKey) {
        await this.closeConnection({
          database: connectionKey,
        });
      }
    }
  }
}