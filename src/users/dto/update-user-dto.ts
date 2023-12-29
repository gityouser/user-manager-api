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
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @MinLength(3) // Added on top of the specs
  @ApiProperty({ description: 'Name of the User', required: false })
  name?: string;

  @IsOptional()
  @ArrayMinSize(1)
  @IsEnum(Role, { each: true })
  @ApiProperty({
    description: 'Roles of the User',
    type: [String],
    required: false,
  })
  roles?: RoleValue[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsEnum(Group, { each: true })
  @ApiProperty({
    description: 'Groups of the User',
    type: [String],
    required: false,
  })
  groups?: GroupValue[];
}
