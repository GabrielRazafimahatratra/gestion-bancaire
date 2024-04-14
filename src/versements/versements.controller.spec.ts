import { Test, TestingModule } from '@nestjs/testing';
import { VersementsController } from './versements.controller';

describe('VersementsController', () => {
  let controller: VersementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VersementsController],
    }).compile();

    controller = module.get<VersementsController>(VersementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
