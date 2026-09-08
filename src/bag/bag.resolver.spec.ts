import { Test, TestingModule } from '@nestjs/testing';
import { BagResolver } from './bag.resolver';
import { BagService } from './bag.service';

describe('BagResolver', () => {
  let resolver: BagResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BagResolver, BagService],
    }).compile();

    resolver = module.get<BagResolver>(BagResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
