import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateWebUrlDto } from './dto/create-web-url.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ulid } from 'ulid';
import { ConfigService } from '@nestjs/config';
import { ENV_VARS, Strings } from 'src/constants';
import { randomBytes } from 'crypto'
@Injectable()
export class WebUrlService {
  private readonly URL_PREFIX: string;
  private readonly CLOUDFLARE_URL: string;
  constructor(private readonly prismaService: PrismaService, private readonly configService: ConfigService) {
    this.URL_PREFIX = this.configService.get<string>(ENV_VARS.URL_PREFIX)
    this.CLOUDFLARE_URL = this.configService.get<string>(ENV_VARS.CLOUDFLARE_URL)
  }
  /**
   * Creates a new shortened URL entry in the database.
   * 
   * @param {CreateWebUrlDto} createWebUrlDto - Data transfer object containing the URL to be shortened and an optional custom alias.
   * @param {string} userId - The ID of the user creating the shortened URL.
   * @returns {Promise<{status: string, message: string, data: any}>} - An object containing the status, message, and the created URL data.
   * @throws {InternalServerErrorException} - Throws an exception if URL creation fails.
   */
  async create(createWebUrlDto: CreateWebUrlDto, userId: string) {
    try {
      const ipAddress = await this.getIpAddress(createWebUrlDto.url);
      createWebUrlDto.customAlias ? await this.checkForAlias(createWebUrlDto.customAlias) : null
      const generatedUrl = createWebUrlDto.customAlias ? createWebUrlDto.customAlias : await this.generateShortenedUrl()
      const url = await this.prismaService.url.create({
        data: {
          urlId: ulid(),
          url: createWebUrlDto.url,
          ipAddress: ipAddress,
          shortenedUrl: generatedUrl,
          userId: userId
        }
      });
      return {
        status: 'success',
        message: Strings.URL.CREATED.SUCCESS,
        data: url
      }
    }
    catch (err) {
      throw new InternalServerErrorException(Strings.URL.CREATED.FAIL)
    }
  }

  /**
   * Retrieves a list of URLs associated with a specific user.
   *
   * @param {string} userId - The ID of the user whose URLs are to be retrieved.
   * @param {string} limit - The maximum number of URLs to retrieve. If not provided, all URLs will be retrieved.
   * @param {string} offSet - The number of URLs to skip before starting to collect the result set. If not provided, no URLs will be skipped.
   * @returns {Object} An object containing the status, message, and data (list of URLs).
   * @throws {InternalServerErrorException} If there is an error while fetching the URLs.
   */
  async findAll(userId: string, limit: string, offSet: string) {
    try {
      const urls = await this.prismaService.url.findMany({
        where: {
          userId: userId
        },
        take: limit ? parseInt(limit) : undefined,
        skip: offSet ? parseInt(offSet) : undefined
      });
      return {
        status: 'success',
        message: Strings.URL.FETCH.SUCCESS,
        data: urls
      }
    }
    catch (err) {
      throw new InternalServerErrorException(Strings.URL.FETCH.FAIL)
    }
  }

  /**
   * Finds a URL record by its ID and the user ID.
   *
   * @param {string} urlId - The ID of the URL to find.
   * @param {string} userId - The ID of the user who owns the URL.
   * @returns {Promise<{status: string, message: string, data: any}>} - An object containing the status, message, and the found URL data.
   * @throws {InternalServerErrorException} - Throws an exception if there is an error during the fetch operation.
   */
  async findOne(urlId: string, userId: string) {
    try {
      const url = await this.prismaService.url.findUnique({
        where: {
          userId: userId,
          urlId: urlId
        }
      })
      return {
        status: 'success',
        message: Strings.URL.FETCH.SUCCESS,
        data: url
      }
    }
    catch (err) {
      throw new InternalServerErrorException(Strings.URL.FETCH.FAIL)
    }
  }



  // update(id: number, updateWebUrlDto: UpdateWebUrlDto) {
  //   return `This action updates a #${id} webUrl`;
  // }

  /**
   * Removes a URL entry from the database for a given user.
   *
   * @param {string} urlId - The ID of the URL to be removed.
   * @param {string} userId - The ID of the user who owns the URL.
   * @returns {Promise<{status: string, message: string}>} - An object containing the status and a success message.
   * @throws {InternalServerErrorException} - Throws an exception if the URL deletion fails.
   */
  async remove(urlId: string, userId: string) {
    try {
      await this.prismaService.url.delete({
        where: {
          userId: userId,
          urlId: urlId
        }
      })
      return {
        status: 'success',
        message: Strings.URL.DELETED.SUCCESS
      }

    }
    catch (error) {
      throw new InternalServerErrorException(Strings.URL.DELETED.FAIL)
    }
  }

  ////////////////////////////HELPER FUNCTIONS///////////////////////////

  /**
   * Checks if a given alias already exists in the database.
   * 
   * @param alias - The alias to check for existence.
   * @throws {ConflictException} If the alias already exists.
   * @throws {InternalServerErrorException} If an unexpected error occurs.
   * @returns {Promise<void>} A promise that resolves if the alias does not exist.
   */
  async checkForAlias(alias: string) {
    try {
      const response = await this.prismaService.url.findFirst({
        where: {
          shortenedUrl: alias
        }
      });
      if (response === null) {
        return true;
      }
      throw new ConflictException(Strings.URL.ALIAS.CONFLICT.MESSAGE)
    }
    catch (err) {
      if (err) {
        throw err;
      }
      else {
        throw new InternalServerErrorException()
      }
    }
  }

  /**
   * Retrieves the IP address of a given URL by querying the Cloudflare DNS service.
   *
   * @param {string} url - The URL from which to extract the domain and retrieve the IP address.
   * @returns {Promise<string>} - A promise that resolves to the IP address of the given URL.
   * @throws {Error} - Throws an error if the DNS query fails.
   */
  async getIpAddress(url: string) {
    try {
      const extractDomain = (url: string) => {
        const domain = new URL(url).hostname;
        return domain;
      };
      const domainName = extractDomain(url);
      const clodflareUrl = `${this.CLOUDFLARE_URL}?name=${domainName}&type=A`;  // Query for A record (IPv4)

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
      throw new Error(Strings.URL.DNS.FAIL);
    }
  }

  /**
   * Generates a shortened URL string.
   *
   * This function creates a random string of 10 hexadecimal characters
   * to be used as a shortened URL identifier.
   *
   * @returns {Promise<string>} A promise that resolves to the generated shortened URL string.
   * @throws {Error} If there is an error during the URL creation process.
   */
  async generateShortenedUrl(): Promise<string> {
    try {
      const randomString = randomBytes(10).toString('hex').slice(0, 10);
      return randomString;
    }
    catch (error) {
      throw new Error(Strings.URL.CREATED.FAIL);
    }
  }

  /**
   * Retrieves the original URL corresponding to the given shortened URL.
   *
   * @param {string} url - The shortened URL to look up.
   * @returns {Promise<string>} - A promise that resolves to the original URL.
   * @throws {NotFoundException} - If the shortened URL is not found in the database.
   */
  async getUrl(url: string): Promise<string> {
    try {
      const result = await this.prismaService.url.findUnique({
        where: {
          shortenedUrl: url
        }
      })
      return result.url
    }
    catch (err) {
      throw new NotFoundException(Strings.URL.NOT_FOUND)
    }
  }
}
