import { IsNotEmpty } from 'class-validator';

export class ScanQrDto {
  @IsNotEmpty({ message: 'QR Code value tidak boleh kosong' })
  qrCodeValue: string;
}
