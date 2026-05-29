import { Module } from '@nestjs/common';
import { CreatePassangerModule } from './add-passanger/passanger.module';

@Module({
  imports: [CreatePassangerModule],
})
export class PatientModule {}
