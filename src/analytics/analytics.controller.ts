import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/Guards/auth.guard';

@ApiTags('ANALYTICS')
@UseGuards(AuthGuard)
@Controller('analytics')
@ApiBearerAuth(`access-token`)
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) {
    }

    @Get(':urlId')
    @ApiQuery({ name: 'limit', required: false, description: 'Maximum number of analytics objects return' })
    @ApiQuery({ name: 'offset', required: false, description: 'Offset of analytics  object to return' })
    getAnalyticsByUrlId(@Param('urlId') urlId: string, @Query('limit') limit?: string, @Query('offSet') offSet?: string) {
        return this.analyticsService.getAnalyticsByUrlId(urlId, limit, offSet)
    }
}
