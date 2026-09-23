import { Test, TestingModule } from '@nestjs/testing';
import { StuffResolver } from './staff.resolver';
import { StuffService } from './staff.service';

describe('StuffResolver', () => {
  let resolver: StuffResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StuffResolver, StuffService],
    }).compile();

    resolver = module.get<StuffResolver>(StuffResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
