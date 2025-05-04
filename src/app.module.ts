import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { CaslModule } from './casl/casl.module';
import { UserModule } from './user/user.module';
import { AppointmentModule } from './appointment/appointment.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    CaslModule,
    UserModule,
    AppointmentModule,
  ],
})
export class AppModule {}
