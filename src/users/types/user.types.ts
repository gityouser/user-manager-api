import { Group } from '../enum/group.enum';
import { Role } from '../enum/role.enum';

export type RoleValue = (typeof Role)[keyof typeof Role];
export type GroupValue = (typeof Group)[keyof typeof Group];
