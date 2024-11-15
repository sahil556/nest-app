import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateProductCommand } from "../commands/update-product.command";
import { Repository } from "typeorm";
import { Product } from "src/product/entities/product.entity";
import { InjectRepository } from "@nestjs/typeorm";

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler implements ICommandHandler<UpdateProductCommand>{

    constructor(@InjectRepository(Product) private readonly productRepo: Repository<Product>){}

    execute(command: UpdateProductCommand): Promise<any> {
        const {id, name, description, price} = command;
        return this.productRepo.update(id, {name, description, price});
    }
}