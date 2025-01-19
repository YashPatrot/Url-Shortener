import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWebUrlDto } from './dto/create-web-url.dto';
import { UpdateWebUrlDto } from './dto/update-web-url.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ulid } from 'ulid';
import { ConfigService } from '@nestjs/config';
import { ENV_VARS } from 'src/constants';
import { randomBytes } from 'crypto'



@Injectable()
export class WebUrlService {
  private readonly URL_PREFIX: string;
  constructor(private readonly prismaService: PrismaService, private readonly configService: ConfigService) {
    this.URL_PREFIX = this.configService.get<string>(ENV_VARS.URL_PREFIX)
    this.generateShortenedUrl()
  }
  async create(createWebUrlDto: CreateWebUrlDto, userId: string) {
    try {
      const ipAddress = await this.getIpAddress(createWebUrlDto.url);
      await this.checkForAlias(createWebUrlDto.customAlias);
      const generatedUrl = createWebUrlDto.customAlias ? createWebUrlDto.customAlias : await this.generateShortenedUrl()
      await this.prismaService.url.create({
        data: {
          urlId: ulid(),
          url: createWebUrlDto.url,
          ipAddress: ipAddress,
          shortenedUrl: generatedUrl,
          userId: userId
        }
      });
      return {
        shortenedUrl: this.URL_PREFIX + generatedUrl
      }
    }
    catch (err) {
      throw new Error(err.message)
    }
  }

  findAll(userId: string, limit: string, offSet: string) {
    try {
      return this.prismaService.url.findMany({
        where: {
          userId: userId
        },
        take: limit ? parseInt(limit) : undefined,
        skip: offSet ? parseInt(offSet) : undefined
      });
    }
    catch (err) {
      throw new Error(`Failed to fetch the records`)
    }
  }

  async findOne(urlId: string, userId: string,) {
    try {
      return await this.prismaService.url.findUnique({
        where: {
          userId: userId,
          urlId: urlId
        }
      })
    }
    catch (err) {
      throw new Error(`Failed to get the url for the provided id`)
    }
  }



  // update(id: number, updateWebUrlDto: UpdateWebUrlDto) {
  //   return `This action updates a #${id} webUrl`;
  // }

  remove(urlId: string, userId: string) {
    try {
      return this.prismaService.url.delete({
        where: {
          userId: userId,
          urlId: urlId
        }
      })

    }
    catch (error) {
      throw new Error(`Failed to delete the url for the provided urlId`)

    }
  }

  ////////////////////////////HELPER FUNCTIONS///////////////////////////
  async validateUrl(url: string) {
    return await fetch(url);
  }

  async checkForAlias(alias: string) {
    try {
      const response = await this.prismaService.url.findFirst({
        where: {
          shortenedUrl: alias
        }
      });
      if (response.url) {
        throw new Error(`Please select other custom alias`)
      }
    }
    catch (err) {

    }
  }

  async getIpAddress(url: string) {
    try {
      const extractDomain = (url: string) => {
        const domain = new URL(url).hostname;
        return domain;
      };
      const domainName = extractDomain(url);
      const clodflareUrl = `https://cloudflare-dns.com/dns-query?name=${domainName}&type=A`;  // Query for A record (IPv4)

      const response = await fetch(clodflareUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/dns-json',  // Specify DNS JSON format
        },
      });

      const data = await response.json();
      return data.Answer[0].data;
    }
    catch (err) {
      throw new Error(`Failed to Resolve the DNS`);
    }

  }

  async generateShortenedUrl(): Promise<string> {
    try {
      const randomString = randomBytes(10).toString('hex').slice(0, 10);
      return randomString;
    }
    catch (error) {
      throw new Error(`Failed to generate the url`);
    }
  }

  async getUrl(url: string) {
    try {
      const result = await this.prismaService.url.findUnique({
        where: {
          shortenedUrl: url
        }
      })
      return result.url
    }
    catch (err) {
      throw new NotFoundException('Not found')
    }
  }

}
