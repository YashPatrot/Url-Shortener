import { Module } from '@nestjs/common';
import { WebUrlService } from './web-url.service';
import { WebUrlController } from './web-url.controller';

@Module({
  controllers: [WebUrlController],
  providers: [WebUrlService],
  exports: [WebUrlService]
})
export class WebUrlModule { }
