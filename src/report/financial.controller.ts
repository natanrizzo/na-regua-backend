import { Controller, Get, UseGuards } from "@nestjs/common";
import { FinancialService } from "./financial.service";
import { CurrentUser } from "src/auth/currentUser.decorator";
import { User } from "generated/prisma";
import { CheckPolicies } from "src/casl/policies/policies.decorator";
import { PoliciesGuard } from "src/casl/policies/policies.guard";
import { ReadFinancialPolicy } from "./policy/readFinancial.policy";

@Controller('reports/financial')
@UseGuards(PoliciesGuard)
export class FinancialController {
    constructor(
        private readonly financialService: FinancialService
    ) {}

    @Get('daily')
    @CheckPolicies(new ReadFinancialPolicy())
    async getRevenueByDay(
        @CurrentUser() user: User
    ) {
        return await this.financialService.getRevenueByDay(user);
    }

    @Get('by-appointment')
    @CheckPolicies(new ReadFinancialPolicy())
    async getRevenueByAppointment(
        @CurrentUser() user: User
    ) {
        return await this.financialService.getRevenueByAppointment(user);
    }

    @Get('by-product')
    @CheckPolicies(new ReadFinancialPolicy())
    async getRevenueByProduct(
        @CurrentUser() user: User
    ) {
        return await this.financialService.getRevenueByProduct(user);
    }
}