import { Test, TestingModule } from '@nestjs/testing';
import { VersementsService } from './versements.service';

describe('VersementsService', () => {
  let service: VersementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VersementsService],
    }).compile();

    service = module.get<VersementsService>(VersementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
