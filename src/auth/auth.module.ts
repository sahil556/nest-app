import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  controllers: [AuthController],
  providers: [
    AuthGuard,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
  imports: [UsersModule, 
    JwtModule.register({
      secret: process.env.AUTH_SECRET,
      signOptions: {expiresIn: '8h'}
    })
  ],
  exports: [AuthGuard, JwtModule]
})
export class AuthModule {}
