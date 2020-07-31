import { KeyValue } from '@sz/interface';
import { CRUD, DESCRIPTION, Controls } from '@sz/enum';
import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

/**
 * Given a set of key value pair(s) return an interpolated string
 * @param {string} message - String to be interpolated
 * @param {Array<KeyValue> | KeyValue} values - interpolation key value pair(s)
 * @returns interpolated message
 */
export const interpolate = (
  message: string,
  values: Array<KeyValue> | KeyValue,
): string => {
  return values instanceof Array
    ? values.reduce((acc, v) => interpolate(acc, v), message)
    : ((): string => {
        const [key, value] = Object.entries(values)[0];
        return message.replace(`{{${key}}}`, value as string);
      })();
};

/**
 * Given a crudAction and a control key return an API Operation object
 * @param {CRUD} crudAction - String to be interpolated
 * @param {CONTROLS} key - control key
 * @returns API Operation object
 */
export const constructOperation = (
  crudAction: CRUD,
  key?: Controls,
): Partial<OperationObject> => {
  return {
    summary: key
      ? interpolate(DESCRIPTION[crudAction], { key })
      : DESCRIPTION[crudAction],
  };
};
