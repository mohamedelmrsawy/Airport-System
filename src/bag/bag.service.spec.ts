import { Test, TestingModule } from '@nestjs/testing';
import { BagService } from './bag.service';

describe('BagService', () => {
  let service: BagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BagService],
    }).compile();

    service = module.get<BagService>(BagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
