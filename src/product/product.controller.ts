import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProductCommand } from './cqrs/commands/create-product.command';
import { ListProduct } from './cqrs/handlers/list-product-handler';
import { GetProductsQuery } from './cqrs/queries/get-products.query';

@Controller('product')
export class ProductController {
    constructor(private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ){}

    @Post()
    async create(@Body('name') name: string, @Body('description') description: string, @Body('price') price: number)
    {
        return this.commandBus.execute(new CreateProductCommand(name, description, price))
    }

    @Get()
    async getallProducts()
    {
        return this.commandBus.execute(new GetProductsQuery());
    }
}
