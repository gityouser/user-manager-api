import {
  IsString,
  IsArray,
  ArrayMinSize,
  MaxLength,
  IsEnum,
  MinLength,
} from 'class-validator';
import { Role } from '../enum/role.enum';
import { Group } from '../enum/group.enum';
import { GroupValue, RoleValue } from '../types/user.types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @MaxLength(100)
  @MinLength(3) // Added on top of the specs
  @ApiProperty({ description: 'Name of the User' })
  name: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsEnum(Role, { each: true })
  @ApiProperty({ description: 'Roles of the User', type: [String] })
  roles: RoleValue[];

  @IsArray()
  @ArrayMinSize(1)
  @IsEnum(Group, { each: true })
  @ApiProperty({ description: 'Groups of the User', type: [String] })
  groups: GroupValue[];
}
