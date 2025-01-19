import { PartialType } from '@nestjs/swagger';
import { CreateWebUrlDto } from './create-web-url.dto';

export class UpdateWebUrlDto extends PartialType(CreateWebUrlDto) {}
