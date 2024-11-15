import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateProductCommand } from "../commands/create-product.command";
import { Repository } from "typeorm";
import { Product } from "src/product/entities/product.entity";

@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand>
{
    constructor(private readonly productRepository: Repository<Product>)
    {

    }
    execute(command: CreateProductCommand): Promise<any> {
        const { name, description, price} = command;
        return this.productRepository.save({ name, description, price});
    }

}