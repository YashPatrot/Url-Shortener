import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Strings } from 'src/constants';
import { User } from 'src/decorators/users.decorator';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService
  ) { }

  /**
   * Creates a new user with the provided data.
   *
   * @param {CreateUserDto} createUserDto - The data transfer object containing the user's information.
   * @returns {Promise<{status: string; message: string; data: {userId: string; creationDate: Date; email: string; name: string | null;}}>} 
   * A promise that resolves to an object containing the status, message, and user data.
   * 
   * @throws {InternalServerErrorException} If there is an error during user creation.
   */
  async create(createUserDto: CreateUserDto): Promise<{
    status: string;
    message: string;
    data: {
      userId: string;
      creationDate: Date;
      email: string;
      name: string | null;
    };
  }> {
    try {
      const user = await this.prismaService.user.create({
        data: createUserDto
      });
      return {
        status: 'success',
        message: Strings.USER.CREATED.SUCCESS,
        data: user
      }
    }
    catch (error) {
      throw new InternalServerErrorException(Strings.USER.CREATED.FAIL)

    }
  }

  /**
   * Retrieves a list of users with optional pagination.
   *
   * @param {string} limit - The maximum number of users to retrieve. If not provided, all users will be retrieved.
   * @param {string} offSet - The number of users to skip before starting to collect the result set. If not provided, no users will be skipped.
   * @returns {Promise<{status: string, message: string, data: any[]}>} - A promise that resolves to an object containing the status, message, and data (list of users).
   * @throws {InternalServerErrorException} - Throws an exception if there is an error during the fetch operation.
   */
  async findAll(limit: string, offSet: string): Promise<{
    status: string;
    message: string;
    data: {
      userId: string;
      creationDate: Date;
      email: string;
      name: string | null;
    }[];
  }> {
    try {
      const users = await this.prismaService.user.findMany({
        take: limit ? parseInt(limit) : undefined,
        skip: offSet ? parseInt(offSet) : undefined
      });
      return {
        status: 'success',
        message: Strings.USER.FETCH.SUCCESS,
        data: users
      }
    }
    catch (error) {
      throw new InternalServerErrorException(Strings.USER.FETCH.FAIL)
    }
  }

  /**
   * Finds a user by their unique identifier.
   *
   * @param {string} userId - The unique identifier of the user to find.
   * @returns {Promise<{status: string, message: string, data: any}>} A promise that resolves to an object containing the status, message, and user data.
   * @throws {InternalServerErrorException} If there is an error while fetching the user.
   */
  async findOne(userId: string): Promise<{
    status: string;
    message: string;
    data: {
      userId: string;
      creationDate: Date;
      email: string;
      name: string | null;
    };
  }> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          userId: userId
        }
      });
      return {
        status: 'success',
        message: Strings.USER.FETCH.SUCCESS,
        data: user
      }
    }
    catch (error) {
      throw new InternalServerErrorException(Strings.USER.FETCH.FAIL)
    }
  }

  /**
   * Updates a user's information in the database.
   *
   * @param {string} userId - The unique identifier of the user to be updated.
   * @param {UpdateUserDto} updateUserDto - The data transfer object containing the updated user information.
   * @returns {Promise<{status: string, message: string, data: any}>} - An object containing the status, message, and updated user data.
   * @throws {InternalServerErrorException} - Throws an exception if the update operation fails.
   */
  async update(userId: string, updateUserDto: UpdateUserDto): Promise<{
    status: string;
    message: string;
    data: {
      userId: string;
      creationDate: Date;
      email: string;
      name: string | null;
    };
  }> {
    try {
      const user = await this.prismaService.user.update({
        where: {
          userId: userId
        },
        data: updateUserDto
      });
      return {
        status: 'success',
        message: Strings.USER.UPDATED.SUCCESS,
        data: user
      }
    }
    catch (error) {
      throw new InternalServerErrorException(Strings.USER.UPDATED.FAIL)

    }
  }

  /**
   * Removes a user and all associated URLs from the database.
   *
   * @param {string} userId - The ID of the user to be removed.
   * @returns {Promise<{ status: string, message: string, data: any }>} - A promise that resolves to an object containing the status, message, and data of the removed user.
   * @throws {InternalServerErrorException} - Throws an exception if the user or associated URLs could not be deleted.
   */
  async remove(userId: string): Promise<{
    status: string;
    message: string;
    data: {
      userId: string;
      creationDate: Date;
      email: string;
      name: string | null;
    };
  }> {
    try {
      await this.prismaService.url.deleteMany({
        where: {
          userId: userId
        }
      })
      const user = await this.prismaService.user.delete({
        where: {
          userId: userId
        }
      });
      return {
        status: 'success',
        message: Strings.USER.DELETED.SUCCESS,
        data: user
      }
    }
    catch (error) {
      throw new InternalServerErrorException(Strings.USER.DELETED.FAIL)
    }
  }


}
