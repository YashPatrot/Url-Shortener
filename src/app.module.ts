import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { AwsModule } from './aws/aws.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Global()
@Module({
  imports: [AuthModule, AwsModule, ConfigModule.forRoot({ isGlobal: true }), UsersModule],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService]
})
export class AppModule { }
