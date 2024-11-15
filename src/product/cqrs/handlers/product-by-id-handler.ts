import { ICommandHandler, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetProductByIdQuery } from "../queries/get-product-by-id.query";
import { Repository } from "typeorm";
import { Product } from "src/product/entities/product.entity";
import { InjectRepository } from "@nestjs/typeorm";

@QueryHandler(GetProductByIdQuery)
export class ProductByIdHandler implements IQueryHandler<GetProductByIdQuery>{

    constructor(@InjectRepository(Product) private readonly productRepo: Repository<Product>){}

    execute(query: GetProductByIdQuery): Promise<any> {
        const { id } = query;
        return this.productRepo.findOneBy({id});
    }
}