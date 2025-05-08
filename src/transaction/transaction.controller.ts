import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { CreateTransactionDTO } from "./dto/createTransaction.dto";
import { CurrentUser } from "src/auth/currentUser.decorator";
import { User } from "generated/prisma";
import { UpdateTransactionDTO } from "./dto/updateTransaction.dto";

@Controller('transaction')
export class TransactionController {
    constructor(
        private readonly transactionService: TransactionService
    ) {}

    @Post('/')
    async createTransaction(
        @Body() createTransactionDTO: CreateTransactionDTO
    ) {
        return this.transactionService.createTransaction(createTransactionDTO);
    }

    @Get('/')
    async getTransactions(
        @CurrentUser() user: User,
    ) {
        return this.transactionService.getTransactions(user);
    }

    @Get('/:id')
    async getTransactionById(
        @Param('id') id: string,
    ) {
        return this.transactionService.getTransactionById(id);
    }

    @Patch('/:id')
    async updateTransaction(
        @Body() updateTransactionDTO: UpdateTransactionDTO,
        @Param('id') id: string,

    ) {
        return this.transactionService.updateTransaction(id, updateTransactionDTO);
    }
}