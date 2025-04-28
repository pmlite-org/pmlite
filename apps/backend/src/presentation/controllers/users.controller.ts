import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from '../../application/usecases/users.service';
import { UserModel } from '../models/user.model';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users', operationId: 'usersGet' })
  @ApiResponse({
    status: 200,
    description: 'Return all users',
    type: [UserModel],
  })
  getAllUsers(): UserModel[] {
    return this.usersService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user', operationId: 'usersCreate' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: UserModel,
  })
  create(@Body() userModel: UserModel): UserModel {
    return;
  }
}
