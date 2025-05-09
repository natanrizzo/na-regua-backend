import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { Transaction, User } from "generated/prisma";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateTransactionDTO } from "./dto/createTransaction.dto";
import { UpdateTransactionDTO } from "./dto/updateTransaction.dto";
import { AbilityFactory } from "src/casl/ability.factory";
import { TransactionModel } from "src/models/transaction.model";
import { accessibleBy } from "@casl/prisma";

@Injectable()
export class TransactionService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly abilityFactory: AbilityFactory
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

    async getTransactions(user: User): Promise<Transaction[]> {
        const ability = this.abilityFactory.defineAbilityFor(user);

        if (!ability.can('read', TransactionModel)) {
            throw new ForbiddenException('Access to transactions denied!');
        }

        const whereFilter = accessibleBy(ability).TransactionModel;

        return await this.prisma.transaction.findMany({
            where: whereFilter,
            include: {
                appointment: true,
                product: true,
            },
        });
    }

    async getTransactionById(id: string, user: User): Promise<Transaction | undefined> {
        const transaction = await this.prisma.transaction.findUnique({
            where: { id },
            include: {
                appointment: true,
                product: true
            }
        });

        if (!transaction) throw new NotFoundException(`Transaction ${id} not found`);

        const ability = this.abilityFactory.defineAbilityFor(user);

        const transactionModel = new TransactionModel(
            transaction.id,
            transaction.appointmentId,
            transaction.productId,
            transaction.amount,
            transaction.createdAt,
            transaction.appointment
        )

        if (!ability.can('read', transactionModel)) {
            throw new ForbiddenException(`You cannot access appointment ${id}`)
        }

        return transaction;
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