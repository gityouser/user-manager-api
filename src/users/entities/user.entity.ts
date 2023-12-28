import { Group } from '../enum/group.enum';
import { Role } from '../enum/role.enum';
import { GroupValue, RoleValue } from '../types/user.types';

export class User {
  id: number;
  name: string;
  roles: RoleValue[];
  groups: GroupValue[];
}
