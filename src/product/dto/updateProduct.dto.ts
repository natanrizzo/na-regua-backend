import { IsNumber, IsOptional } from "class-validator";

export class UpdateProductDTO {
    @IsOptional()
    name: string;

    @IsOptional()
    @IsNumber()
    salePrice: number;

    @IsOptional()
    @IsNumber()
    profit: number;
}