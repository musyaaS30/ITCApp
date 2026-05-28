import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ScanQrDto } from './dto/scan-qr.dto';

@Controller('attendance')
@UseGuards(JwtAuthGuard)
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}



  @Get('today')
  async getTodayStatus(@Request() req) {
    return this.attendanceService.getTodayStatus(req.user.id);
  }

  @Get('history')
  async getHistory(@Request() req) {
    return this.attendanceService.getHistory(req.user.id);
  }

  @Post('scan')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async scanQR(@Body() dto: ScanQrDto) {
    return this.attendanceService.scanQR(dto.qrCodeValue);
  }

  @Get('admin/stats')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async getAdminStats() {
    return this.attendanceService.getAdminStats();
  }
}
