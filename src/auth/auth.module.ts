import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';

@Global()
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UsersModule],
  exports: [AuthService]
})
export class AuthModule { }
