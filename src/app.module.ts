import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { CaslModule } from './casl/casl.module';
import { UserModule } from './user/user.module';
import { AppointmentModule } from './appointment/appointment.module';
import { ProductModule } from './product/product.module';
import { ReportModule } from './report/report.module';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    CaslModule,
    UserModule,
    AppointmentModule,
    ProductModule,
    ReportModule,
    ServiceModule,
  ],
})
export class AppModule {}
