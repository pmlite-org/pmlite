import { z } from "zod";

export function zodValidator(schema: z.ZodSchema) {
  return function (value: any, callback: (valid: boolean) => void) {
    const result = schema.safeParse(value);
    callback(result.success);
  };
}
