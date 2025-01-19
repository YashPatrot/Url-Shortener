import { Controller, Get, Param, Req, Res } from "@nestjs/common";
import { WebUrlService } from "./web-url/web-url.service";
import { Response } from "express";

@Controller()
export class PublicController {

    constructor(private readonly webUrlService: WebUrlService) {
    }

    @Get(':url')
    async getUrl(@Req() request: Request, @Res() response: Response, @Param('url') url: string) {
        const originalUrl = await this.webUrlService.getUrl(url)
        return response.status(302).redirect(originalUrl)
    }
}