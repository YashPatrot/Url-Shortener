import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'


@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {

  constructor() {
    // Apply extensions during initialization
    super()
    this.$extends(withAccelerate());
  }

  async onModuleInit() {
    await this.$connect();
  }
}
