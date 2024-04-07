import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { FirebaseModule } from '../firebase/firebase.module';
@Module({
  imports: [FirebaseModule],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}
