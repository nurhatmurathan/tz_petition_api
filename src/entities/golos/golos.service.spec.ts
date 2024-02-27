import { Test, TestingModule } from '@nestjs/testing';
import { GolosService } from './golos.service';

describe('GolosService', () => {
  let service: GolosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GolosService],
    }).compile();

    service = module.get<GolosService>(GolosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
