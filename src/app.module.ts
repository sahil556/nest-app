import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product/product.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { Product } from './product/entities/product.entity';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongoModule } from './database/mongo.module';
import { StreamModule } from './stream/stream.module';

@Module({
  imports: [ProductModule, AuthModule, UsersModule, StreamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
