import { GroupValue, RoleValue } from '../types/user.types';

export class User {
  id: number;
  name: string;
  roles: RoleValue[];
  groups: GroupValue[];
}
