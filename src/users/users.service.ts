import { Injectable } from '@nestjs/common';
import { usersSeed } from './users.seed';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [...usersSeed];

  findAll() {
    return this.users;
  }
}
