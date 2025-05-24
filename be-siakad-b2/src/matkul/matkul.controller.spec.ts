import { Test, TestingModule } from '@nestjs/testing';
import { MatkulController } from './matkul.controller';
import { MatkulService } from './matkul.service';

describe('MatkulController', () => {
  let controller: MatkulController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatkulController],
      providers: [MatkulService],
    }).compile();

    controller = module.get<MatkulController>(MatkulController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
