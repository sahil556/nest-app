import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProductCommand } from './cqrs/commands/create-product.command';
import { GetProductsQuery } from './cqrs/queries/get-products.query';
import { NotFoundError } from 'rxjs';

@Controller('product')
export class ProductController {
    constructor(private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ){}

    @Post()
    async create(@Body('name') name: string, @Body('description') description: string, @Body('price') price: number)
    {
        console.log(name, description, price);
        return this.commandBus.execute(new CreateProductCommand(name, description, price))
    }

    @Get()
    async getallProducts()
    {
        try{
        return this.queryBus.execute(new GetProductsQuery());
        }
        catch(err)
        {
            console.log(err)
            throw new NotFoundException();
        }
    }
}
