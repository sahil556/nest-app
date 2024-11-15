import { Module } from '@nestjs/common';
import { CreateProductHandler } from './cqrs/handlers/create-product-handler';
import { ProductByIdHandler } from './cqrs/handlers/product-by-id-handler';
import { UpdateProductHandler } from './cqrs/handlers/update-product-handler';
import { ListProduct } from './cqrs/handlers/list-product-handler';
import { DeleteProductHandler } from './cqrs/handlers/delete-product-handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
    imports:[TypeOrmModule.forFeature([Product]), CqrsModule],
    controllers:[ProductController],
    providers: [CreateProductHandler, ListProduct, DeleteProductHandler, UpdateProductHandler, ProductByIdHandler]
})
export class ProductModule {
    
}
