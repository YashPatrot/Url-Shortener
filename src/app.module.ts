import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { AwsModule } from './aws/aws.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { WebUrlModule } from './web-url/web-url.module';
import { PublicController } from './public.controller';
import { AnalyticsModule } from './analytics/analytics.module';

@Global()
@Module({
  imports: [AuthModule, AwsModule, ConfigModule.forRoot({ isGlobal: true }), UsersModule, WebUrlModule, AnalyticsModule],
  controllers: [PublicController],
  providers: [PrismaService],
  exports: [PrismaService]
})
export class AppModule { }
