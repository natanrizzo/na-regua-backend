import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateServiceDTO {
    @IsNotEmpty()
    name: string;

    @IsNumber()
    price: number;

    @IsNumber()
    duration: number;
}