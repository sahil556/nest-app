import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product/product.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { Product } from './entities/product.entity';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongoModule } from './database/mongo.module';
import { StreamModule } from './stream/stream.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ProductModule, AuthModule, UsersModule, StreamModule, 
    JwtModule.register({
      secret: process.env.AUTH_SECRET,
      signOptions: {expiresIn: '8h'}
    })
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
})
export class AppModule {}
