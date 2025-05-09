import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { CreateTransactionDTO } from "./dto/createTransaction.dto";
import { CurrentUser } from "src/auth/currentUser.decorator";
import { User } from "generated/prisma";
import { UpdateTransactionDTO } from "./dto/updateTransaction.dto";
import { PoliciesGuard } from "src/casl/policies/policies.guard";
import { CheckPolicies } from "src/casl/policies/policies.decorator";
import { CreateTransactionPolicy } from "./policies/createTransaction.policy";
import { UpdateTransactionPolicy } from "./policies/updateTransaction.policy";

@Controller('transaction')
@UseGuards(PoliciesGuard)
export class TransactionController {
    constructor(
        private readonly transactionService: TransactionService
    ) {}

    @Post('/')
    @CheckPolicies(new CreateTransactionPolicy())
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
        @CurrentUser() user: User,
    ) {
        return this.transactionService.getTransactionById(id, user);
    }

    @Patch('/:id')
    @CheckPolicies(new UpdateTransactionPolicy())
    async updateTransaction(
        @Body() updateTransactionDTO: UpdateTransactionDTO,
        @Param('id') id: string,

    ) {
        return this.transactionService.updateTransaction(id, updateTransactionDTO);
    }
}