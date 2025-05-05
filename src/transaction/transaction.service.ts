import { Injectable } from "@nestjs/common";
import { Transaction } from "generated/prisma";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateTransactionDTO } from "./dto/createTransaction.dto";
import { UpdateTransactionDTO } from "./dto/updateTransaction.dto";

@Injectable()
export class TransactionService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async createTransaction({ appointmentId, productId, amount }: CreateTransactionDTO): Promise<Transaction> {
        return await this.prisma.transaction.create({
            data: {
                amount,
                appointment: {
                    connect: {
                        id: appointmentId
                    }
                },
                product: {
                    connect: {
                        id: productId
                    }
                }
            }
        });
    }

    async getTransactions(): Promise<Transaction[]> {
        return await this.prisma.transaction.findMany({
            include: {
                appointment: true,
                product: true,
            },
        });
    }

    async getTransactionById(id: string): Promise<Transaction | undefined> {
        return await this.prisma.transaction.findUnique({
            where: { id },
            include: {
                appointment: true,
                product: true
            }
        });
    }

    async updateTransaction(id: string, { amount }: UpdateTransactionDTO): Promise<Transaction> {
        return await this.prisma.transaction.update({
            where: { id },
            data: {
                amount,
            }
        });
    }
}