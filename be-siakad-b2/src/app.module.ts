import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MahasiswaModule } from './mahasiswa/mahasiswa.module';
import { MatkulModule } from './matkul/matkul.module';

@Module({
  imports: [MahasiswaModule, MatkulModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
