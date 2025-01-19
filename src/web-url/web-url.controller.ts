import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, SetMetadata } from '@nestjs/common';
import { WebUrlService } from './web-url.service';
import { CreateWebUrlDto } from './dto/create-web-url.dto';
import { UpdateWebUrlDto } from './dto/update-web-url.dto';
import { AuthGuard } from 'src/Guards/auth.guard';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/users.decorator';

@Controller('url')
@UseGuards(AuthGuard)
@ApiTags('URL')
@ApiBearerAuth('access-token')
export class WebUrlController {
  constructor(private readonly webUrlService: WebUrlService) { }

  @Post()
  create(@Body() createWebUrlDto: CreateWebUrlDto, @User() user: any) {
    return this.webUrlService.create(createWebUrlDto, user.sub);
  }

  @Get('list')
  @ApiQuery({ name: 'limit', required: false, description: 'Maximum number of users to return' })
  @ApiQuery({ name: 'offset', required: false, description: 'Offset of users to return' })
  findAll(@User() user: any, @Query('limit') limit?: string, @Query('offset') offSet?: string) {
    return this.webUrlService.findAll(user.sub, limit, offSet);
  }

  @Get(':urlId')
  findOne(@Param('urlId') urlId: string, @User() user: any) {
    return this.webUrlService.findOne(urlId, user.sub);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateWebUrlDto: UpdateWebUrlDto) {
  //   return this.webUrlService.update(+id, updateWebUrlDto);
  // }

  @Delete(':urlId')
  remove(@Param('urlId') urlId: string, @User() user: any) {
    return this.webUrlService.remove(urlId, user.sub);
  }
}
