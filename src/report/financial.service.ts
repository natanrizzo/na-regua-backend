import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class FinancialService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async getDailyRevenue() {
        return await this.prisma.transaction.groupBy({
            by: ['createdAt'],
            _sum: { amount: true },
            orderBy: { createdAt: 'asc' },
        });
    }

    async getRevenueByAppointment() {
        const transactions = await this.prisma.transaction.groupBy({
            by: ['appointmentId', 'amount'],
            where: { appointmentId: { not: null } },
            _sum: { amount: true },
        })
        
        const appointmentIds = transactions.map(t => t.appointmentId);

        const appointments = await this.prisma.appointment.findMany({
            where: { id: { in: appointmentIds } },
            select: {
                id: true,
                dateTime: true,
                client: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                service: {
                    select: {
                        id: true,
                        name: true,
                        price: true
                    }
                }
            }
        });

        const appointmentMap = new Map(appointments.map(a => [a.id, a]));

        return transactions.map(t => ({
            appointment: appointmentMap.get(t.appointmentId),
            totalAmount: t._sum.amount,
        }));
    }


    async getRevenueByProduct() {
        const transactions = await this.prisma.transaction.groupBy({
            by: ['productId'],
            where: { productId: { not: null } },
            _sum: { amount: true },
        });

        const productIds = transactions.map(t => t.productId);

        const products = await this.prisma.product.findMany({
            where: { id: { in: productIds }},
            select: { id: true, name: true },
        });
        const productMap = new Map(products.map(p => [p.id, p]));

        return transactions.map(t => ({
            product: productMap.get(t.productId),
            totalAmount: t._sum.amount,
        }));
    }
}