import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

import {
  BookingStatusEnum,
  PaymentModeEnum,
  PaymentStatusEnum,
} from '@common/enums/booking.enum';

@Entity('booking_activity_logs')
export class BookingActivityLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ name: 'booking_id', type: 'varchar' })
  bookingId: string;

  @Column({
    name: 'booking_status',
    type: 'enum',
    enum: BookingStatusEnum,
  })
  bookingStatus: BookingStatusEnum;

  @Column({
    name: 'payment_status',
    type: 'enum',
    enum: PaymentStatusEnum,
  })
  paymentStatus: PaymentStatusEnum;

  @Column({
    name: 'payment_mode',
    type: 'enum',
    enum: PaymentModeEnum,
    nullable: true,
  })
  paymentMode?: PaymentModeEnum;

  @Column({
    name: 'location_id',
    type: 'varchar',
    nullable: true,
  })
  locationId?: string;

  @Column({
    name: 'location_name',
    type: 'varchar',
    nullable: true,
  })
  locationName?: string;

  @Column({
    name: 'remarks',
    type: 'text',
    nullable: true,
  })
  remarks?: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;
}