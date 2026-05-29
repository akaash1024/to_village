import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'locations' })
export class Locations {
  @PrimaryColumn({ name: 'location_id', type: 'varchar' })
  locationId: string;

  @Column({ name: 'client_id', type: 'varchar' })
  clientId: string;

  @Column({ name: 'lc_code', type: 'varchar', length: 5 })
  lcCode: string;

  @Column({ name: 'location_name', type: 'varchar', length: 255 })
  locationName: string;

  @Column({ name: 'client_name', type: 'varchar', length: 255, nullable: true })
  clientName: string;

  @Column({
    name: 'address_line1',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  addressLine1: string | null;

  @Column({
    name: 'address_line2',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  addressLine2: string | null;

  @Column({
    // name: 'sub_domain',
    name: 'subDomain',
    type: 'varchar',
    nullable: true,
  })
  subDomain: string | null;

  @Column({
    // name: 'onboarding_date',
    name: 'onboardingDate',
    type: 'date',
    nullable: true,
  })
  onboardingDate: Date | null;

  @Column({
    name: 'zipcode',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  pincode: string | null;

  @Column({
    name: 'city',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  city: string | null;

  @Column({
    name: 'state',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  state: string | null;

  @Column({
    name: 'country',
    type: 'varchar',
    length: 100,
    default: 'India',
  })
  country: string;

  @Column({
    name: 'contact_number',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  contactNumber: string | null;

  @Column({
    name: 'contact_email',
    type: 'varchar',
    nullable: true,
  })
  contactEmail: string | null;

  @Column({
    name: 'website_url',
    type: 'varchar',
    nullable: true,
  })
  websiteUrl: string | null;

  @Column({
    name: 'contact_person_first_name',
    type: 'varchar',
    nullable: true,
  })
  contactPersonFirstName: string | null;

  @Column({
    name: 'contact_person_last_name',
    type: 'varchar',
    nullable: true,
  })
  contactPersonLastName: string | null;


  @Column({
    name: 'contact_person_email',
    type: 'varchar',
    nullable: true,
  })
  contactPersonEmail: string | null;

  @Column({
    name: 'contact_person_phone',
    type: 'varchar',
    nullable: true,
  })
  contactPersonPhone: string | null;


  @Column({
    name: 'is_active',
    type: 'boolean',
    default: true,
  })
  isActive: boolean;



  @Column({
    name: 'is_deleted',
    type: 'boolean',
    default: false,
  })
  isDeleted: boolean;

  @Column({ name: 'created_by', type: 'integer' })
  createdBy: number;

  @Column({ name: 'updated_by', type: 'integer' })
  updatedBy: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
  })
  updatedAt: Date;

}
