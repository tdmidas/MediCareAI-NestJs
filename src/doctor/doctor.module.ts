import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { FirebaseModule } from '../firebase/firebase.module';
import { FirebaseService } from 'src/firebase/firebase.service';
@Module({
  imports: [FirebaseModule],
  controllers: [DoctorController],
  providers: [DoctorService, FirebaseService],
})
export class DoctorModule { }
