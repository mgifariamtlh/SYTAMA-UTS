import { PartialType } from '@nestjs/mapped-types';
import { CreateMatkulDto } from './create-matkul.dto';

export class UpdateMatkulDto extends PartialType(CreateMatkulDto) {}
