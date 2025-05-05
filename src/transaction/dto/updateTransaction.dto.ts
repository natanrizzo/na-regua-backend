import { IsNumber, IsOptional } from "class-validator";

export class UpdateTransactionDTO {
    @IsOptional()
    @IsNumber()
    amount?: number
}