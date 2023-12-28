import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Role } from '../enum/role.enum';

// https://github.com/typestack/class-validator?tab=readme-ov-file#custom-validation-decorators
@ValidatorConstraint({ async: true })
export class IsInPredefinedRolesConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any[]): boolean {
    return value.every((val) => Object.values(Role).includes(val));
  }
}

export function IsInPredefinedRoles(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isInPredefinedRoles',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsInPredefinedRolesConstraint,
    });
  };
}
