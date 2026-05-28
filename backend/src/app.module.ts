import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { RegistrationModule } from './registration/registration.module';
import { AttendanceModule } from './attendance/attendance.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    RegistrationModule,
    AttendanceModule,
  ],
})
export class AppModule {}
