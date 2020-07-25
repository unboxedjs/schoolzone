import {
  ValidatorConstraintInterface,
  ValidatorConstraint,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'Compare' })
export class CompareConstraint implements ValidatorConstraintInterface {
  validate(
    value: string,
    args: ValidationArguments,
  ): Promise<boolean> | boolean {
    const [propertyName] = args.constraints;
    const relatedValue = args.object[propertyName];
    return value === relatedValue;
  }
}

export function Compare(
  property: string,
  validationOptions?: ValidationOptions,
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (object: Object, propertyName: string): void => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: CompareConstraint,
    });
  };
}
