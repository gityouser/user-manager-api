import { IsString, IsArray, ArrayMinSize, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsArray()
  @ArrayMinSize(1)
  roles: string[];
  // TODO:  should be only from the predefined roles

  @IsArray()
  @ArrayMinSize(1)
  groups: string[];
  // TODO: should be only from the predefined groups
}
