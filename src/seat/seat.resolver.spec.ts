import { Test, TestingModule } from '@nestjs/testing';
import { SeatResolver } from './seat.resolver';
import { SeatService } from './seat.service';

describe('SeatResolver', () => {
  let resolver: SeatResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeatResolver, SeatService],
    }).compile();

    resolver = module.get<SeatResolver>(SeatResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
