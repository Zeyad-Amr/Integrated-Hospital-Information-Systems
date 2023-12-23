import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isValidEnumValue', async: false })
export class IsValidEnumValue implements ValidatorConstraintInterface {
  validate(value: string, validationArguments?: ValidationArguments): boolean {
    const [target] = validationArguments.constraints;
    return Object.values(target).includes(value);
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    const [target] = validationArguments.constraints;
    return `Invalid value. Should be one of: ${Object.values(target).join(
      ', ',
    )}`;
  }
}
