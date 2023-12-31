import { Injectable, NotFoundException } from '@nestjs/common';
import { seedUsers } from './seed';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Injectable()
export class UsersService {
  private users: User[];

  constructor() {
    this.users = [...seedUsers()];
  }

  setUsers(users: User[]) {
    this.users = users;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === +id);
  }

  create(createUserDto: CreateUserDto) {
    const newUser = {
      id: this.users.length + 1, // could use uuid
      ...createUserDto,
    };

    this.users.push(newUser);

    return newUser;
  }

  delete(id: number) {
    const userIndex = this.users.findIndex((user) => user.id === +id);

    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }

    const deletedUser = this.users.splice(userIndex, 1);

    return deletedUser;
  }

  update(id: number, updateUserDto: UpdateUserDto): User | null {
    const userIndex = this.users.findIndex((user) => user.id === +id);

    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }

    const updatedUser: User = {
      ...this.users[userIndex],
      ...updateUserDto,
    };

    this.users[userIndex] = updatedUser;

    return updatedUser;
  }
}
