import { Module } from "@nestjs/common";
import { FinancialController } from "./financial.controller";
import { FinancialService } from "./financial.service";


@Module({
    controllers: [FinancialController],
    providers: [FinancialService],
    exports: [FinancialService]
})
export class ReportModule {}