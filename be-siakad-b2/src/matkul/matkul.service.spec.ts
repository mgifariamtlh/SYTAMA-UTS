import { Test, TestingModule } from '@nestjs/testing';
import { MatkulService } from './matkul.service';

describe('MatkulService', () => {
  let service: MatkulService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatkulService],
    }).compile();

    service = module.get<MatkulService>(MatkulService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
