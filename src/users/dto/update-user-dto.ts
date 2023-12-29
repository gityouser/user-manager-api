import {
  IsString,
  IsArray,
  IsOptional,
  MinLength,
  MaxLength,
  ArrayMinSize,
  IsEnum,
} from 'class-validator';
import { GroupValue, RoleValue } from '../types/user.types';
import { Role } from '../enum/role.enum';
import { Group } from '../enum/group.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @MinLength(3) // Added on top of the specs
  name?: string;

  @IsOptional()
  @ArrayMinSize(1)
  @IsEnum(Role, { each: true })
  roles?: RoleValue[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsEnum(Group, { each: true })
  groups?: GroupValue[];
}
