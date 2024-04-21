import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
    imports: [FirebaseModule, JwtModule.register({
        signOptions: { expiresIn: '1h' }
    })],
    controllers: [AuthController],
    providers: [AuthService, JwtService]
})
export class AuthModule {

}
