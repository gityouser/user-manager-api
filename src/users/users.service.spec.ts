import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Role } from './enum/role.enum';
import { Group } from './enum/group.enum';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', () => {
    const userDto = {
      name: 'John Doe',
      roles: [Role.Admin],
      groups: [Group.Group1],
    };
    const createdUser = service.create(userDto);
    expect(createdUser).toEqual({ id: expect.any(Number), ...userDto });
  });

  it('should find all users', () => {
    service.create({
      name: 'John Doe',
      roles: [Role.Admin],
      groups: [Group.Group1],
    });
    expect(service.findAll()).toHaveLength(1);
  });

  it('should find a user by id', () => {
    const createdUser = service.create({
      name: 'John Doe',
      roles: [Role.Admin],
      groups: [Group.Group1],
    });
    expect(service.findOne(createdUser.id)).toEqual(createdUser);
  });

  it('should update a user', () => {
    const createdUser = service.create({
      name: 'John Doe',
      roles: [Role.Admin],
      groups: [Group.Group1],
    });
    const updatedUser = service.update(createdUser.id, { name: 'Jane Doe' });
    expect(updatedUser).toEqual({ ...createdUser, name: 'Jane Doe' });
  });

  it('should delete a user', () => {
    const createdUser = service.create({
      name: 'John Doe',
      roles: [Role.Admin],
      groups: [Group.Group1],
    });
    service.delete(createdUser.id);
    expect(service.findOne(createdUser.id)).toBeUndefined();
  });
});
