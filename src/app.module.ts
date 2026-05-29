import { getDefaultImports } from '@common/startupModules/imports';
import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ConnectionModule } from '@assets/connection';
import { AddLocationModule } from './modules/location/add-location/add-location.module';
import { PatientModule } from './modules/passanger/passanger.module';
import { BookingModule } from './modules/bus-booking/booking/booking.module';
import { BusBookingModule } from './modules/bus-booking/bus-booking.module';



@Module({
  imports: [...getDefaultImports(),
    ConnectionModule,
    AuthModule,
    AddLocationModule,
    PatientModule,
    BusBookingModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
