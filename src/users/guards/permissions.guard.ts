import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { rolePermissions } from '../role-permissions';
import { Permission } from '../enum/permission.enum';
import { UsersService } from '../users.service';

export const permissionsMetadataKey = 'permissions';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.get<Permission[]>(
      permissionsMetadataKey,
      context.getHandler(),
    );

    if (!requiredPermissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userId = request.headers.authorization;
    console.log('userId :>> ', userId);
    console.log(
      'this.usersService.findAll() :>> ',
      this.usersService.findAll(),
    );

    const user = await this.usersService.findOne(+userId);
    if (!user) {
      return false;
    }

    return user.roles.some((role) =>
      requiredPermissions.every((permission) =>
        rolePermissions[role].includes(permission),
      ),
    );
  }
}
