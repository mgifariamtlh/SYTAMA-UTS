import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { MatkulService } from './matkul.service';
import { CreateMatkulDto } from './dto/create-matkul.dto';
import { UpdateMatkulDto } from './dto/update-matkul.dto';

@Controller('matakuliah')
export class MatkulController {
  constructor(private readonly service: MatkulService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':kode')
  findOne(@Param('kode') kode: string) {
    const matkul = this.service.findOne(kode);
    if (!matkul) {
      throw new NotFoundException(
        `Mata Kuliah dengan kode ${kode} tidak ditemukan`,
      );
    }
    return matkul;
  }

  @Post()
  create(@Body() dto: CreateMatkulDto) {
    return this.service.create(dto);
  }

  @Put(':kode')
  update(@Param('kode') kode: string, @Body() dto: UpdateMatkulDto) {
    try {
      const updated = this.service.update(kode, dto);
      if (!updated) {
        throw new NotFoundException(
          `Mata Kuliah dengan kode ${kode} tidak ditemukan`,
        );
      }
      return updated;
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Terjadi kesalahan tak dikenal');
    }
  }

  @Delete(':kode')
  remove(@Param('kode') kode: string) {
    const deleted = this.service.remove(kode);
    if (!deleted) {
      throw new NotFoundException(
        `Mata Kuliah dengan kode ${kode} tidak ditemukan`,
      );
    }
    return deleted;
  }
}

// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { MatkulService } from './matkul.service';
// import { CreateMatkulDto } from './dto/create-matkul.dto';
// import { UpdateMatkulDto } from './dto/update-matkul.dto';

// @Controller('matkul')
// export class MatkulController {
//   constructor(private readonly matkulService: MatkulService) {}

//   @Post()
//   create(@Body() createMatkulDto: CreateMatkulDto) {
//     return this.matkulService.create(createMatkulDto);
//   }

//   @Get()
//   findAll() {
//     return this.matkulService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.matkulService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateMatkulDto: UpdateMatkulDto) {
//     return this.matkulService.update(+id, updateMatkulDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.matkulService.remove(+id);
//   }
// }
