import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
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

    const user = await this.usersService.findOne(+userId);
    if (!user) {
      return false;
    }

    const hasPermission = user.roles.some((role) =>
      requiredPermissions.every((permission) =>
        rolePermissions[role].includes(permission),
      ),
    );

    if (!hasPermission) {
      throw new ForbiddenException(
        'Not allowed to perform action due to insufficient permissions',
      );
    }

    return user.roles.some((role) =>
      requiredPermissions.every((permission) =>
        rolePermissions[role].includes(permission),
      ),
    );
  }
}
