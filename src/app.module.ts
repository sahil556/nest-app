import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product/product.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { Product } from './product/entities/product.entity';
import { ProductModule } from './product/product.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
      database: 'database.sqlite',
      synchronize: true,
      logging: true,
      entities: [Product],
  }), ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
