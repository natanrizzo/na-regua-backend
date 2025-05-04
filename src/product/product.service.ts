import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateProductDTO } from "./dto/createProduct.dto";
import { UpdateProductDTO } from "./dto/updateProduct.dto";

@Injectable()
export class ProductService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async createProduct({ name, salePrice, profit }: CreateProductDTO) {
        return await this.prisma.product.create({
            data: {
                name,
                salePrice,
                profit,
            }
        });
    }

    async updateProduct(id: string, { name, salePrice, profit }: UpdateProductDTO) {
        return await this.prisma.product.update({
            where: { id },
            data: {
                name,
                salePrice,
                profit
            }
        });
    }
}