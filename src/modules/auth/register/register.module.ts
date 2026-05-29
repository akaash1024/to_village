import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@entities/index';
import { RegisterUserService } from './register.service';
import { RegisterUserController } from './register.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [RegisterUserController],
  providers: [RegisterUserService],
  exports: [RegisterUserService],
})
export class RegisterUserModule {}
