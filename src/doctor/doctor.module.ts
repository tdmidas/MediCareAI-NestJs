import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { FirebaseModule } from '../firebase/firebase.module';
import { FirebaseService } from 'src/firebase/firebase.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [FirebaseModule, AuthModule],
  controllers: [DoctorController],
  providers: [DoctorService, FirebaseService, JwtService],

})
export class DoctorModule { }
