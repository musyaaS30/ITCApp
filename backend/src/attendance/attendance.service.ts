import { Injectable, ConflictException, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  private getDayBounds() {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);
    return { startOfDay, endOfDay };
  }




  async getTodayStatus(userId: number) {
    const { startOfDay, endOfDay } = this.getDayBounds();

    const existing = await this.prisma.attendance.findFirst({
      where: {
        userId,
        attendedAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    return {
      attended: !!existing,
      details: existing || null,
    };
  }

  async getHistory(userId: number) {
    return this.prisma.attendance.findMany({
      where: { userId },
      orderBy: { attendedAt: 'desc' },
    });
  }

  async scanQR(qrCodeValue: string) {
    if (!qrCodeValue || !qrCodeValue.startsWith('ITC-ATT-')) {
      throw new BadRequestException('Format QR Code tidak valid atau bukan untuk absensi IT Club');
    }

    const parts = qrCodeValue.split('-');
    if (parts.length < 4) {
      throw new BadRequestException('Format QR Code tidak valid');
    }

    const targetUserId = parseInt(parts[2], 10);
    const qrTimestamp = parseInt(parts[3], 10);

    if (isNaN(targetUserId)) {
      throw new BadRequestException('ID Anggota di dalam QR Code tidak valid');
    }

    // Optional safety: Prevent replay attacks of screenshots older than 10 minutes
    const now = Date.now();
    const tenMinutes = 10 * 60 * 1000;
    if (now - qrTimestamp > tenMinutes) {
      throw new BadRequestException('QR Code sudah kedaluwarsa. Silakan perbarui QR Code di aplikasi Anda');
    }

    // Verify target user exists
    const user = await this.prisma.user.findUnique({
      where: { id: targetUserId },
    });

    if (!user) {
      throw new NotFoundException('Anggota tidak ditemukan');
    }

    const { startOfDay, endOfDay } = this.getDayBounds();

    // Check if target user has already checked in today
    const existing = await this.prisma.attendance.findFirst({
      where: {
        userId: targetUserId,
        attendedAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    if (existing) {
      throw new ConflictException(`Anggota ${user.name} sudah melakukan absensi hari ini`);
    }

    const log = await this.prisma.attendance.create({
      data: {
        userId: targetUserId,
        attendedAt: new Date(),
      },
    });

    return {
      success: true,
      message: 'Absensi berhasil dicatat oleh Petugas',
      studentName: user.name,
      attendedAt: log.attendedAt,
    };
  }

  // Get overall stats for Admin Dashboard
  async getAdminStats() {
    const totalMembers = await this.prisma.user.count({ where: { role: 'member' } });
    const { startOfDay, endOfDay } = this.getDayBounds();
    const todayAbsents = await this.prisma.attendance.count({
      where: {
        attendedAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    // Recent activities
    const recentLogs = await this.prisma.attendance.findMany({
      take: 10,
      orderBy: { attendedAt: 'desc' },
      include: {
        user: {
          select: { name: true },
        },
      },
    });

    return {
      totalMembers,
      todayAbsents,
      recentLogs: recentLogs.map((log) => ({
        id: log.id,
        studentName: log.user.name,
        time: log.attendedAt.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        status: 'Hadir',
      })),
    };
  }
}
