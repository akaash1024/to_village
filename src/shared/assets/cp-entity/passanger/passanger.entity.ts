import { GenderEnum } from '@common/enums/passanger.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';




@Entity('passenger')
export class Passenger {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'passenger_id',
    unique: true,
  })
  passengerId: string;
  // ex: PSG000001

  @Column({
    name: 'full_name',
    length: 150,
  })
  fullName: string;

  @Column({
    length: 15,
    unique: true,
  })
  mobile: string;

  @Column({
    type: 'enum',
    enum: GenderEnum,
    nullable: true,
  })
  gender?: GenderEnum;


  @Column({
    name: 'address_line_1',
    nullable: true,
  })
  addressLine1?: string;

  @Column({
    name: 'address_line_2',
    nullable: true,
  })
  addressLine2?: string;

  @Column({
    nullable: true,
  })
  area?: string;

  @Column({
    nullable: true,
  })
  city?: string;



  @Column({
    nullable: true,
  })
  state?: string;


  @Column({
    nullable: true,
  })
  pincode?: string;

  @Column({
    name: 'emergency_contact_name',
    nullable: true,
  })
  emergencyContactName?: string;

  @Column({
    name: 'emergency_contact_number',
    nullable: true,
  })
  emergencyContactNumber?: string;

  // =========================
  // Passenger Status
  // =========================

  @Column({
    name: 'is_active',
    default: true,
  })
  isActive: boolean;

  @Column({
    name: 'is_blocked',
    default: false,
  })
  isBlocked: boolean;

  @Column({
    name: 'is_deleted',
    default: false,
  })
  isDeleted: boolean;

  // =========================
  // Audit
  // =========================

  @Column({
    name: 'created_by',
    nullable: true,
  })
  createdBy?: string;

  @Column({
    name: 'updated_by',
    nullable: true,
  })
  updatedBy?: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}