import { ICommandHandler, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetProductsQuery } from "../queries/get-products.query";
import { Repository } from "typeorm";
import { Product } from "src/entities/product.entity";
import { InjectRepository } from "@nestjs/typeorm";

@QueryHandler(GetProductsQuery)
export class ListProduct implements IQueryHandler<GetProductsQuery>{
    constructor(@InjectRepository(Product) private readonly productRepo: Repository<Product>){}
    execute(): Promise<Product[]> {
        return this.productRepo.find()
    }
    
}