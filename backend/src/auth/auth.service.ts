import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    // Check if email already registered in users
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email ini sudah terdaftar sebagai pengguna');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Determine role (first user or specific email can be admin for testing, e.g. admin@itc.com)
    let role = 'member';
    if (dto.email === 'admin@itc.com') {
      role = 'admin';
    }

    // Create the user inside a transaction
    const user = await this.prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: hashedPassword,
          role,
        },
      });

      // Automatically link to any club registration that was submitted earlier with the same email
      const registration = await tx.clubRegistration.findUnique({
        where: { email: dto.email },
      });

      if (registration) {
        await tx.clubRegistration.update({
          where: { id: registration.id },
          data: { userId: newUser.id },
        });
      }

      return newUser;
    });

    return {
      message: 'Registrasi akun berhasil',
      userId: user.id,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Email atau password salah');
    }

    const passwordMatch = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Email atau password salah');
    }

    // Generate JWT payload
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Login berhasil',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}
