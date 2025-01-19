import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService
  ) { }

  create(createUserDto: CreateUserDto) {
    try {
      return this.prismaService.user.create({
        data: createUserDto
      });
    }
    catch (error) {
      throw error
    }
  }

  findAll(limit: string, offSet: string) {
    try {
      return this.prismaService.user.findMany({
        take: limit ? parseInt(limit) : undefined,
        skip: offSet ? parseInt(offSet) : undefined
      });
    }
    catch (error) {
      throw error
    }
  }

  findOne(userId: string) {
    try {
      return this.prismaService.user.findUnique({
        where: {
          userId: userId
        }
      });
    }
    catch (error) {
      throw error
    }
  }

  update(userId: string, updateUserDto: UpdateUserDto) {
    try {
      return this.prismaService.user.update({
        where: {
          userId: userId
        },
        data: updateUserDto
      });
    }
    catch (error) {
      throw error
    }
  }

  async remove(userId: string) {
    try {
      await this.prismaService.url.deleteMany({
        where: {
          userId: userId
        }
      })
      return await this.prismaService.user.delete({
        where: {
          userId: userId
        }
      });
    }
    catch (error) {
      throw error
    }
  }
}
