import { Test, TestingModule } from '@nestjs/testing';
import { VirementsController } from './virements.controller';

describe('VirementsController', () => {
  let controller: VirementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VirementsController],
    }).compile();

    controller = module.get<VirementsController>(VirementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
