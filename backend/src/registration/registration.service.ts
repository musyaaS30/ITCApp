import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';

@Injectable()
export class RegistrationService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateRegistrationDto) {
    // Prevent duplicate registrations by same email
    const existingRegistration = await this.prisma.clubRegistration.findUnique({
      where: { email: dto.email },
    });

    if (existingRegistration) {
      throw new ConflictException('Email ini sudah pernah digunakan untuk pendaftaran IT Club');
    }

    // Check if user already exists in system with this email (to link immediately)
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    const registration = await this.prisma.clubRegistration.create({
      data: {
        fullName: dto.fullName,
        email: dto.email,
        className: dto.className,
        reasonJoin: dto.reasonJoin,
        division: dto.division,
        divisionReason: dto.divisionReason,
        userId: existingUser ? existingUser.id : null,
      },
    });

    return {
      message: 'Registrasi IT Club berhasil disimpan',
      registrationId: registration.id,
    };
  }

  async findMe(userId: number) {
    return this.prisma.clubRegistration.findUnique({
      where: { userId },
    });
  }
}
