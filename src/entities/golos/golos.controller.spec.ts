import { Test, TestingModule } from '@nestjs/testing';
import { GolosController } from './golos.controller';

describe('GolosController', () => {
  let controller: GolosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GolosController],
    }).compile();

    controller = module.get<GolosController>(GolosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
