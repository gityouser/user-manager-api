import { Role } from '../enum/role.enum';
import { Group } from '../enum/group.enum';
import { User } from '../entities/user.entity';

export const usersSeed: User[] = [
  {
    id: 1,
    name: 'John Doe',
    roles: [Role.Admin, Role.Personal],
    groups: [Group.Group1, Group.Group2],
  },
  {
    id: 2,
    name: 'Grabriel Monroe',
    roles: [Role.Personal],
    groups: [Group.Group1, Group.Group2],
  },
  {
    id: 3,
    name: 'Alex Xavier',
    roles: [Role.Personal],
    groups: [Group.Group2],
  },
  {
    id: 4,
    name: 'Jarvis Khan',
    roles: [Role.Admin, Role.Personal],
    groups: [Group.Group2],
  },
  {
    id: 5,
    name: 'Martines Polok',
    roles: [Role.Admin, Role.Personal],
    groups: [Group.Group1],
  },
  {
    id: 6,
    name: 'Gabriela Wozniak',
    roles: [Role.Viewer, Role.Personal],
    groups: [Group.Group1],
  },
];
