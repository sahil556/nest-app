import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProductCommand } from './cqrs/commands/create-product.command';
import { GetProductsQuery } from './cqrs/queries/get-products.query';
import { NotFoundError } from 'rxjs';
import { UpdateProductCommand } from './cqrs/commands/update-product.command';
import { GetProductByIdQuery } from './cqrs/queries/get-product-by-id.query';
import { DeleteProductCommand } from './cqrs/commands/delete-product.command';

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

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body('name') name: string, @Body('description') description: string, @Body('price') price: number)
    {
        return this.commandBus.execute(new UpdateProductCommand(id, name, description, price));
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

    @Get(':id')
    async getProductById(@Param('id') id: number)
    {
        try{
            return this.queryBus.execute(new GetProductByIdQuery(id));
        }
        catch(err)
        {
            console.log(err)
            throw new NotFoundException();
        }
    }

    @Delete(':id')
    async deleteProductById(@Param('id') id: number)
    {
        return this.commandBus.execute(new DeleteProductCommand(id));
    }
}
