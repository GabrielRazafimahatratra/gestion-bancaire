import { Test, TestingModule } from '@nestjs/testing';
import { MyemailService } from './myemail.service';

describe('MyemailService', () => {
  let service: MyemailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyemailService],
    }).compile();

    service = module.get<MyemailService>(MyemailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
