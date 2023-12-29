import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { PermissionsGuard } from './guards/permissions.guard';
import { Permission } from './enum/permission.enum';
import { Permissions } from './decorators/permissions.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(PermissionsGuard)
  @Permissions(Permission.View)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(PermissionsGuard)
  @Permissions(Permission.View)
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  @UseGuards(PermissionsGuard)
  @Permissions(Permission.Create)
  create(@Body(new ValidationPipe()) body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Delete(':id')
  @UseGuards(PermissionsGuard)
  @Permissions(Permission.Delete)
  delete(@Param('id') id: number) {
    return this.usersService.delete(id);
  }

  @Patch(':id')
  @UseGuards(PermissionsGuard)
  @Permissions(Permission.Edit)
  update(
    @Param('id') id: number,
    @Body(new ValidationPipe()) body: UpdateUserDto,
  ) {
    return this.usersService.update(id, body);
  }
}
