import { ICommandHandler, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetProductsQuery } from "../queries/get-products.query";
import { Repository } from "typeorm";
import { Product } from "src/product/entities/product.entity";

@QueryHandler(GetProductsQuery)
export class ListProduct implements IQueryHandler<GetProductsQuery>{
    constructor(private readonly productRepo: Repository<Product>){}
    execute(command: GetProductsQuery): Promise<Product[]> {
        return this.productRepo.find()
    }
    
}