import { Role } from './enum/role.enum';
import { Permission } from './enum/permission.enum';

export const rolePermissions = {
  [Role.Admin]: [
    Permission.Create,
    Permission.View,
    Permission.Edit,
    Permission.Delete,
  ],
  [Role.Personal]: [],
  [Role.Viewer]: [Permission.View],
};
