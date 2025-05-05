import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateTransactionDTO {
    @IsNotEmpty()
    appointmentId: string;

    @IsNotEmpty()
    productId: string;

    @IsNumber()
    amount: number;
}