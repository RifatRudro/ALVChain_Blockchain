import { z } from "zod";

export const followsSchema = <T extends z.ZodTypeAny>(
  value: any,
  schema: T,
): value is z.infer<T> => schema.safeParse(value).success;
