import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from '../auth/roles.guard';

@Module({
  controllers: [AttendanceController],
  providers: [
    AttendanceService,
    Reflector,
    RolesGuard,
  ],
})
export class AttendanceModule {}
