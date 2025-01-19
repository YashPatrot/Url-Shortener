import { Test, TestingModule } from '@nestjs/testing';
import { WebUrlService } from './web-url.service';

describe('WebUrlService', () => {
  let service: WebUrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebUrlService],
    }).compile();

    service = module.get<WebUrlService>(WebUrlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
