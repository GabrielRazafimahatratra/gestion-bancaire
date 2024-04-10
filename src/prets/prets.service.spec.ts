import { Test, TestingModule } from '@nestjs/testing';
import { PretsService } from './prets.service';

describe('PretsService', () => {
  let service: PretsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PretsService],
    }).compile();

    service = module.get<PretsService>(PretsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
