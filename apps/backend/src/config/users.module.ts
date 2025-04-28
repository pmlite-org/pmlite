import { Module } from '@nestjs/common';
import { UsersService } from '../application/usecases/users.service';
import { UsersController } from '../presentation/controllers/users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
