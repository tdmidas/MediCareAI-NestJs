import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { FirebaseService } from 'src/firebase/firebase.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
@Module({
    imports: [FirebaseModule, AuthModule],
    controllers: [UserController],
    providers: [UserService, FirebaseService, JwtService],

})
export class UserModule { }
