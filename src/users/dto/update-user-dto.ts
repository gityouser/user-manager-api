import { IsString, IsArray, IsOptional } from 'class-validator';
import { GroupValue, RoleValue } from '../types/user.types';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsArray()
  roles?: RoleValue[];

  @IsOptional()
  @IsArray()
  groups?: GroupValue[];
}
