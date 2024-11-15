import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product/product.controller';
import { CreateProductHandler } from './product/cqrs/handlers/create-product-handler';
import { ListProduct } from './product/cqrs/handlers/list-product-handler';
import { DeleteProductHandler } from './product/cqrs/handlers/delete-product-handler';
import { CqrsModule } from '@nestjs/cqrs';
import { Product } from './product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product]),TypeOrmModule.forRoot({
    type: 'sqlite',
      database: 'database.sqlite',
      synchronize: true,
      logging: true,
      entities: [Product],
  }), CqrsModule],
  controllers: [AppController, ProductController],
  providers: [AppService, CreateProductHandler, ListProduct, DeleteProductHandler],
})
export class AppModule {}
