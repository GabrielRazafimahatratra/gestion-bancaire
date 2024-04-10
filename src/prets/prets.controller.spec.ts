import { Test, TestingModule } from '@nestjs/testing';
import { PretsController } from './prets.controller';

describe('PretsController', () => {
  let controller: PretsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PretsController],
    }).compile();

    controller = module.get<PretsController>(PretsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
