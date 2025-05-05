import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ProductService } from "./product.service";
import { PoliciesGuard } from "src/casl/policies/policies.guard";
import { CheckPolicies } from "src/casl/policies/policies.decorator";
import { UpdateProductPolicy } from "./policies/updateProduct.policy";
import { UpdateProductDTO } from "./dto/updateProduct.dto";
import { CreateProductPolicy } from "./policies/createProduct.policy";
import { CreateProductDTO } from "./dto/createProduct.dto";
import { Public } from "src/auth/public.decorator";
import { DeleteProductPolicy } from "./policies/deleteProduct.policy";

@Controller('product')
@UseGuards(PoliciesGuard)
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) {}

    @Post('/')
    @CheckPolicies(new CreateProductPolicy())
    async createProduct(
        @Body() createProductDTO: CreateProductDTO
    ) {
        return await this.productService.createProduct(createProductDTO);
    }

    @Get('/')
    @Public()
    async getProducts() {
        return await this.productService.getProducts();
    }

    @Get('/:id')
    @Public()
    async getOneProductById(
        @Param('id') id: string
    ) {
        return await this.productService.getOneProductById(id);
    }


    @Patch('/:id')
    @CheckPolicies(new UpdateProductPolicy())
    async updateProduct(
        @Param('id') id: string,
        @Body() updateProductDTO: UpdateProductDTO
    ) {
        return await this.productService.updateProduct(id, updateProductDTO);
    }

    @Delete('/:id')
    @CheckPolicies(new DeleteProductPolicy())
    async deleteProduct(
        @Param('id') id: string
    ) {
        return await this.productService.deleteProduct(id);
    }
}