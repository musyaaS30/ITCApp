import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('registrations')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post()
  async create(@Body() dto: CreateRegistrationDto) {
    return this.registrationService.create(dto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async findMe(@Request() req) {
    return this.registrationService.findMe(req.user.id);
  }
}
