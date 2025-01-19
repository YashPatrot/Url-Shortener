import { Test, TestingModule } from '@nestjs/testing';
import { WebUrlController } from './web-url.controller';
import { WebUrlService } from './web-url.service';

describe('WebUrlController', () => {
  let controller: WebUrlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebUrlController],
      providers: [WebUrlService],
    }).compile();

    controller = module.get<WebUrlController>(WebUrlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
