import { Injectable } from '@nestjs/common';
import { UserModel } from '../../presentation/models/user.model';

@Injectable()
export class UsersService {
  private readonly users: UserModel[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
  ];

  findAll(): UserModel[] {
    return this.users;
  }
}
