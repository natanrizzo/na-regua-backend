import { IsOptional } from "class-validator";

export class UpdateServiceDTO {
    @IsOptional()
    name: string;

    @IsOptional()
    price: number;

    @IsOptional()
    duration: number;
}