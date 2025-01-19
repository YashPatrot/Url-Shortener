import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ulid } from 'ulid';
import { ConfigService } from '@nestjs/config';
import { ENV_VARS, Strings } from 'src/constants';
import axios from 'axios';
import { Console } from 'console';


@Injectable()
export class AnalyticsService {
    // private readonly APIIP_API_KEY: string;
    // private readonly APIIP_API_END_POINT: string
    constructor(private readonly prismaService: PrismaService, private readonly configService: ConfigService) {
        // this.APIIP_API_KEY = this.configService.get(ENV_VARS.APIIP.APIIP_API_KEY)
        // this.APIIP_API_END_POINT = this.configService.get(ENV_VARS.APIIP.APIIP_API_END_POINT)
    }

    async getAnalyticsByUrlId(urlId: string, limit?: string, offSet?: string) {
        try {
            const analytics = await this.prismaService.analytics.findMany({
                where: {
                    urlId: urlId
                },
                take: limit ? parseInt(limit) : undefined,
                skip: offSet ? parseInt(offSet) : undefined
            })
            return {
                status: 'success',
                message: Strings.ANALYTICS.FETCH.SUCCESS,
                analytics: analytics
            }
        }
        catch (err) {
            throw new InternalServerErrorException(Strings.ANALYTICS.FETCH.FAIL)

        }

    }
    async createAnalytics(url: string, request: Request) {
        try {
            const retrievedUrl = await this.getUrlByShortUrl(url);
            const visitorIp = request.headers['x-forwarded-for']
            const userAgent = request.headers['user-agent']
            const referer = request.headers['referer'] || request.headers['referrer'] || 'UNKNOWN'



            await this.prismaService.analytics.create({
                data: {
                    analyticsId: ulid(),
                    urlId: retrievedUrl.urlId,
                    visitorIp: visitorIp,
                    userAgent: userAgent,
                    referrer: referer
                }
            })

            await this.prismaService.url.update({
                where: {
                    urlId: retrievedUrl.urlId
                },
                data: {
                    visitorsCount: {
                        increment: 1
                    }
                }
            })
            return {
                status: 'success',
                message: Strings.ANALYTICS.CREATE.SUCCESS
            }
        }
        catch (err) {
            throw new InternalServerErrorException(Strings.ANALYTICS.CREATE.FAIL)
        }
    }

    /*********************************HELPER FUNCTIONS*************************************/

    // async getLocaionByIp(ipAddress: string) {
    //     try {
    //         const response = await axios.get(`${this.APIIP_API_END_POINT}`, {
    //             params: {
    //                 ip: ipAddress,
    //                 accessKey: this.APIIP_API_KEY
    //             }
    //         });
    //         return response.data;
    //     }
    //     catch (error) {
    //         return 'UNKNOWN'
    //     }
    // }

    async getUrlByShortUrl(shortUrl: string) {
        try {
            const url = await this.prismaService.url.findFirst({
                where: {
                    shortenedUrl: shortUrl
                }
            })
            return url;
        }
        catch (err) {
            throw new InternalServerErrorException('Failed to retrieve URL by short URL');

        }
    }

}
