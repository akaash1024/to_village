import { BookingStatusEnum } from "@common/enums/booking.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('booking_history')
export class BookingHistoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'booking_id',
  })
  bookingId: string;

  @Column({
    name: 'passenger_id',
  })
  passengerId: number;

  @Column({
    name: 'from_city',
  })
  fromCity: string;

  @Column({
    name: 'to_city',
  })
  toCity: string;

  @Column({
    name: 'journey_date',
    type: 'date',
  })
  journeyDate: Date;

  @Column({
    name: 'seat_number',
    nullable: true,
  })
  seatNumber?: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  amount: number;

  @Column({
    type: 'enum',
    enum: BookingStatusEnum,
    default: BookingStatusEnum.BOOKED,
  })
  status: BookingStatusEnum;

  @Column({
    name: 'cancel_reason',
    nullable: true,
  })
  cancelReason?: string;

  @Column({
    name: 'rescheduled_from_booking_id',
    nullable: true,
  })
  rescheduledFromBookingId?: string;

  @Column({
    name: 'payment_status',
    default: 'PENDING',
  })
  paymentStatus: string;

  @Column({
    name: 'payment_mode',
    nullable: true,
  })
  paymentMode?: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}