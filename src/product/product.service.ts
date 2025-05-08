import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateProductDTO } from "./dto/createProduct.dto";
import { UpdateProductDTO } from "./dto/updateProduct.dto";
import { Product } from "generated/prisma";

@Injectable()
export class ProductService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async createProduct({ name, salePrice, profit, imageUrl }: CreateProductDTO): Promise<Product> {
        return await this.prisma.product.create({
            data: {
                name,
                salePrice,
                profit,
                imageUrl
            }
        });
    }

    async getProducts(): Promise<Product[]> {
        return await this.prisma.product.findMany();
    }

    async getOneProductById(id: string): Promise<Product | undefined> {
        return await this.prisma.product.findUnique({
            where: { id }
        });
    }

    async updateProduct(id: string, { name, salePrice, profit }: UpdateProductDTO): Promise<Product> {
        return await this.prisma.product.update({
            where: { id },
            data: {
                name,
                salePrice,
                profit
            }
        });
    }

    async deleteProduct(id: string) {
        return await this.prisma.product.delete({
            where: { id }
        });
    }
}