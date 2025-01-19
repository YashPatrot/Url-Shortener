import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/Guards/auth.guard';
import { User } from 'src/decorators/users.decorator';

@ApiTags('USERS')
@UseGuards(AuthGuard)
@Controller('users')
@ApiBearerAuth('access-token')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  // @Get('list')
  // @ApiQuery({ name: 'limit', required: false, description: 'Maximum number of users to return' })
  // @ApiQuery({ name: 'offset', required: false, description: 'Offset of users to return' })
  // findAll(@Query('limit') limit?: string, @Query('offset') offSet?: string) {
  //   return this.usersService.findAll(limit, offSet);
  // }

  @Get('profile')
  @ApiQuery({ name: 'userId', required: false, description: 'Optional user ID' })
  findOne(@User() user: any, @Query('userId') userId?: string) {
    const uid = userId ? userId : user.sub
    return this.usersService.findOne(uid);
  }

  @Patch(':userId')
  update(@Param('userId') userId: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete(':userId')
  remove(@Param('userId') userId: string) {
    return this.usersService.remove(userId);
  }
}
