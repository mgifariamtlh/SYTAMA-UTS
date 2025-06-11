import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Mahasiswa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nim: string;

  @Column()
  nama: string;

  @Column()
  prodi: string;

  @Column()
  angkatan: number;

  @Column()
  email: string;
}

// export class Mahasiswa {
//     constructor(
//       public nim: string,
//       public nama: string,
//       public prodi: string,
//       public angkatan: number,
//       public email: string,
//     ) {}
  
//     getDisplayName(): string {
//       return `${this.nama} (${this.nim})`;
//     }
//   }
  