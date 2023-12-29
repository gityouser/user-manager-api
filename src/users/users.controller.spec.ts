import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { Role } from './enum/role.enum';
import { Group } from './enum/group.enum';
import { UsersService } from './users.service';

describe('UsersController, end-to-end', () => {
  let app: INestApplication;
  let usersService: UsersService;
  let adminUserId: number;
  let viewerUserId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    usersService = moduleFixture.get<UsersService>(UsersService);

    const adminUserSeed = usersService.create({
      name: 'Admin Joe',
      roles: [Role.Admin],
      groups: [Group.Group1],
    });

    const viewerUserSeed = usersService.create({
      name: 'Watchful Moe',
      roles: [Role.Viewer],
      groups: [Group.Group1],
    });

    adminUserId = adminUserSeed.id;
    viewerUserId = viewerUserSeed.id;
  });

  it('POST /users should create a user with valid data and correct permissions', async () => {
    await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', adminUserId.toString())
      .send({
        name: 'Valid Admin',
        roles: [Role.Admin],
        groups: [Group.Group1],
      })
      .expect(201);
  });

  it('POST /users should fail for a user without *create* permission', async () => {
    await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', viewerUserId.toString())
      .send({
        name: 'Cannot Create',
        roles: [Role.Personal],
        groups: [Group.Group1],
      })
      .expect(403);
  });

  it('GET /users should retrieve list of users with correct permissions', async () => {
    await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', adminUserId.toString())
      .expect(200);
  });

  it('GET /users/:id should retrieve a user with correct permissions', async () => {
    await request(app.getHttpServer())
      .get(`/users/${adminUserId}`)
      .set('Authorization', adminUserId.toString())
      .expect(200);
  });

  it('PATCH /users/:id should update a user with correct permissions', async () => {
    await request(app.getHttpServer())
      .patch(`/users/${adminUserId}`)
      .set('Authorization', adminUserId.toString())
      .send({ name: 'Name Shifter' })
      .expect(200);
  });

  it('DELETE /users/:id should remove a user with correct permissions', async () => {
    const userToDelete = usersService.create({
      name: 'Tobe Deleted',
      roles: [Role.Admin],
      groups: [Group.Group1],
    });

    await request(app.getHttpServer())
      .delete(`/users/${userToDelete.id}`)
      .set('Authorization', adminUserId.toString())
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
