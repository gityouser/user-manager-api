import { SetMetadata } from '@nestjs/common';
import { permissionsMetadataKey } from '../guards/permissions.guard';

export const Permissions = (...permissions: string[]) =>
  SetMetadata(permissionsMetadataKey, permissions);
