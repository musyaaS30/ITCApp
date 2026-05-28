import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  name: string;

  @IsEmail({}, { message: 'Format email tidak valid' })
  @IsNotEmpty({ message: 'Email tidak boleh kosong' })
  email: string;

  @IsNotEmpty({ message: 'Password tidak boleh kosong' })
  @MinLength(8, { message: 'Password minimal harus 8 karakter' })
  password: string;
}
