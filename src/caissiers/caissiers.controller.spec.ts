import { Test, TestingModule } from '@nestjs/testing';
import { CaissiersController } from './caissiers.controller';

describe('CaissiersController', () => {
  let controller: CaissiersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CaissiersController],
    }).compile();

    controller = module.get<CaissiersController>(CaissiersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
