import { Controller, Get } from "@nestjs/common";
import { FinancialService } from "./financial.service";
import { CurrentUser } from "src/auth/currentUser.decorator";
import { User } from "generated/prisma";

@Controller()
export class FinancialController {
    constructor(
        private readonly financialService: FinancialService
    ) {}

    @Get('daily')
    async getRevenueByDay(
        @CurrentUser() user: User
    ) {
        return await this.financialService.getRevenueByDay(user);
    }

    @Get('by-appointment')
    async getRevenueByAppointment(
        @CurrentUser() user: User
    ) {
        return await this.financialService.getRevenueByAppointment(user);
    }

    @Get('by-product')
    async getRevenueByProduct(
        @CurrentUser() user: User
    ) {
        return await this.financialService.getRevenueByProduct(user);
    }
}