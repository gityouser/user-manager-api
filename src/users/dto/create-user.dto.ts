import {
  IsString,
  IsArray,
  ArrayMinSize,
  MaxLength,
  IsEnum,
} from 'class-validator';
import { Role } from '../enum/role.enum';
import { Group } from '../enum/group.enum';
import { GroupValue, RoleValue } from '../types/user.types';

export class CreateUserDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsEnum(Role, { each: true })
  roles: RoleValue[];

  @IsArray()
  @ArrayMinSize(1)
  @IsEnum(Group, { each: true })
  groups: GroupValue[];
}
