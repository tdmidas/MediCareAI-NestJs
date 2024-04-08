import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
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
import { JwtMiddleware } from './jwt/jwt.middleware';
import { UserGuard } from './user/user.guard';
import { LoggingInterceptor } from './logging/logging.interceptor';
import { ValidateDoctorPipe } from './doctor/validate-doctor/validate-doctor.pipe';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { APP_INTERCEPTOR, APP_GUARD, APP_FILTER, APP_PIPE } from '@nestjs/core';

@Module({
  imports: [DoctorModule, FirebaseModule, UserModule, AuthModule],
  controllers: [AppController, DoctorController, UserController, AuthController],
  providers: [AppService, FirebaseService, DoctorService, UserService, AuthService, JwtMiddleware, UserGuard, LoggingInterceptor, ValidateDoctorPipe, HttpExceptionFilter
    ,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: UserGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidateDoctorPipe
    }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('api/user');
  }
}