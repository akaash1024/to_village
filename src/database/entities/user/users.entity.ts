import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  PrimaryColumn,
} from 'typeorm';

export enum UserType {
  CLIENT_USER = 'ClientUser',
  LOCATION_USER = 'LocationUser',
  SUPER_ADMIN = 'SuperAdmin',
  ADMIN = 'Admin',
}

@Entity({ name: 'user' })
export class User {
  @PrimaryColumn({ name: 'user_id' })
  userId: number;

  @Column({
    name: 'user_type',
    type: 'enum',
    enum: UserType,
  })
  userType: UserType;

  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @Index({ unique: true })
  @Column({
    name: 'username',
    type: 'varchar',
    nullable: true,
  })
  username: string | null;

  @Index({ unique: true })
  @Column({
    name: 'user_code',
    type: 'varchar',
    nullable: true,
  })
  userCode: string | null;

  @Index({ unique: true })
  @Column({
    name: 'email',
    type: 'varchar',
    nullable: true,
  })
  email: string | null;

  @Column({
    name: 'parent_email',
    type: 'varchar',
    nullable: true,
  })
  parentEmail: string | null;

  @Column({ name: 'phone', type: 'varchar' })
  phone: string;

  @Column({ name: 'first_name', type: 'varchar' })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar' })
  lastName: string;

  @Column({
    name: 'designation',
    type: 'varchar',
    nullable: true,
  })
  designation: string | null;

  @Column({
    name: 'is_active',
    type: 'boolean',
    default: true,
  })
  isActive: boolean;

  @Column({
    name: 'is_forget',
    type: 'boolean',
    default: false,
  })
  isforget: boolean;

  @Column({
    name: 'is_deleted',
    type: 'boolean',
    default: false,
  })
  isDeleted: boolean;

  @Column({
    name: 'location_ids',
    type: 'varchar',
    array: true,
    nullable: true,
  })
  locationIds: string[];

  @Column({
    name: 'client_id',
    type: 'varchar',
  })
  clientId: string;

  @Column({
    name: 'cu_number',
    type: 'varchar',
    nullable: true,
  })
  cuNumber: string | null;

  // @CreateDateColumn({ name: 'created_at' })
  // createdAt: Date;

  // @UpdateDateColumn({ name: 'updated_at' })
  // updatedAt: Date;

  @Column({
    name: 'last_login_location',
    type: 'varchar',
    nullable: true,
  })
  lastLoginLocation: string | null;

  @Column({
    name: 'last_login_time',
    type: 'timestamptz',
    nullable: true,
  })
  lastLoginTime: Date | null;

  @Column({
    name: 'user_tokens',
    type: 'varchar',
    array: true,
    nullable: true,
  })
  userTokens: string[];
}
