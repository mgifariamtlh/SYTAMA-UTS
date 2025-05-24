/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsEmail, IsNumber, Length } from 'class-validator';

export class CreateMatkulDto {
  @IsString({ message: 'Kode tidak boleh kosong' })
  kode: string;

  @IsString({ message: 'Nama tidak boleh kosong' })
  nama: string;
  
  @IsNumber({}, { message: 'SKS harus berupa angka' })
  sks: number;

  @IsString({ message: 'Semester harus berupa teks' })
  semester: string;

  @IsString({ message: 'Jurusan harus berupa teks' })
  jurusan: string;
}

