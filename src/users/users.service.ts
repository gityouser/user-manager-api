import { Injectable } from '@nestjs/common';
import { usersSeed } from './seed';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [...usersSeed];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === +id);
  }

  delete(id: number) {
    const userIndex = this.users.findIndex((user) => user.id === +id);

    if (userIndex === -1) {
      return null;
    }

    const deletedUser = this.users.splice(userIndex, 1);

    return deletedUser;
  }
}
