import { IsEmail, IsNotEmpty, IsIn } from 'class-validator';

export class CreateRegistrationDto {
  @IsNotEmpty({ message: 'Nama lengkap tidak boleh kosong' })
  fullName: string;

  @IsEmail({}, { message: 'Format email tidak valid' })
  @IsNotEmpty({ message: 'Email tidak boleh kosong' })
  email: string;

  @IsNotEmpty({ message: 'Kelas tidak boleh kosong' })
  className: string;

  @IsNotEmpty({ message: 'Alasan bergabung tidak boleh kosong' })
  reasonJoin: string;

  @IsNotEmpty({ message: 'Pilihan divisi tidak boleh kosong' })
  @IsIn(['Robotik', 'Web Development', 'Desain'], {
    message: 'Divisi harus berupa Robotik, Web Development, atau Desain',
  })
  division: string;

  @IsNotEmpty({ message: 'Alasan memilih divisi tidak boleh kosong' })
  divisionReason: string;
}
