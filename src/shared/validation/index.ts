import { z as zod } from 'zod';
import Exception from '@joseaburt/http-error';

type Issue = {
  code: string;
  message: string;
};

export default class ZodValidation {
  public static getIssues(val: any): Issue[] {
    if ('issues' in val) return val.issues;
    return [];
  }

  public static getError(val: any) {
    if ('error' in val) return val.error;
    return {};
  }

  public static createValidatorFromSchema(schema: zod.AnyZodObject) {
    return function (payload: any) {
      const { success, ...rest } = schema.safeParse(payload);
      if (!success) {
        const issue = ZodValidation.getIssues(ZodValidation.getError(rest))[0];
        throw new Exception(400, issue.code, issue.message, payload);
      }
    };
  }
}
