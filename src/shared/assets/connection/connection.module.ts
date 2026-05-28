import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConnectionService } from './connection.service';
const insts = {};
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    {
      provide: `ORM_ENTITIES`,
      useValue: undefined,
    },
    ConnectionService,
  ],
  exports: [
    ConnectionService,
    {
      provide: `ORM_ENTITIES`,
      useValue: undefined,
    },
  ],
})
export class ConnectionModule {}
