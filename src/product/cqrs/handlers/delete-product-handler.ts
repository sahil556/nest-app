import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteProductCommand } from "../commands/delete-product.command";
import { Repository } from "typeorm";
import { Product } from "src/entities/product.entity";
import { InjectRepository } from "@nestjs/typeorm";

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler implements ICommandHandler<DeleteProductCommand>{

    constructor(@InjectRepository(Product) private readonly productReposity: Repository<Product>)
    {
        
    }

    async execute(command: DeleteProductCommand): Promise<any> {
        const { id } = command;
        await this.productReposity.delete(id);
    }
    
}