import { Controller, Get, Param, Req, Res } from "@nestjs/common";
import { WebUrlService } from "./web-url/web-url.service";
import { Response } from "express";
import { AnalyticsService } from "./analytics/analytics.service";

@Controller()
export class PublicController {

    constructor(private readonly webUrlService: WebUrlService, private readonly analyticsService: AnalyticsService) {
    }

    @Get(':url')
    async getUrl(@Req() request: Request, @Res() response: Response, @Param('url') url: string) {
        const originalUrl = await this.webUrlService.getUrl(url)
        this.analyticsService.createAnalytics(url, request)
        return response.status(302).redirect(originalUrl)
    }
}