import { Controller, Get, UseGuards } from "@nestjs/common";
import { FinancialService } from "./financial.service";
import { CurrentUser } from "src/auth/currentUser.decorator";
import { User } from "generated/prisma";
import { RolesGuard } from "src/auth/roles/roles.guard";
import { Roles } from "src/auth/roles/roles.decorator";
import { Role } from "src/auth/roles/role.enum";

@Controller('reports/financial')
@UseGuards(RolesGuard)
export class FinancialController {
    constructor(
        private readonly financialService: FinancialService
    ) {}

    @Get('daily')
    @Roles(Role.Administrator)
    async getRevenueByDay() {
        return await this.financialService.getRevenueByDay();
    }

    @Get('by-appointment')
    @Roles(Role.Administrator)
    async getRevenueByAppointment() {
        return await this.financialService.getRevenueByAppointment();
    }

    @Get('by-product')
    @Roles(Role.Administrator)
    async getRevenueByProduct() {
        return await this.financialService.getRevenueByProduct();
    }
}