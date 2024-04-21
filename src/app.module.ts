import { Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorController } from './doctor/doctor.controller';
import { DoctorModule } from './doctor/doctor.module';
import { FirebaseModule } from './firebase/firebase.module';
import { FirebaseService } from './firebase/firebase.service';
import { DoctorService } from './doctor/doctor.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { AuthenticationGuard } from './auth/authentication.guard';
import { AuthorizationGuard } from './auth/authorization.guard';
import { LoggingInterceptor } from './logging/logging.interceptor';
import { ValidateDoctorPipe } from './doctor/validate-doctor/validate-doctor.pipe';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { APP_INTERCEPTOR, APP_FILTER, } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [DoctorModule, FirebaseModule, UserModule, AuthModule],
  controllers: [AppController, DoctorController, UserController, AuthController],
  providers: [AppService, FirebaseService, DoctorService, UserService, AuthService, AuthenticationGuard, AuthorizationGuard, JwtService, LoggingInterceptor, ValidateDoctorPipe, HttpExceptionFilter
    ,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    }
  ],
})

export class AppModule implements NestModule {

  configure(consumer: import('@nestjs/common').MiddlewareConsumer) {
    consumer
      .apply()
      .forRoutes(DoctorController);
  }
}



