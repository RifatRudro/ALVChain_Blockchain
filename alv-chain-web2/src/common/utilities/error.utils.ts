import { delog } from "@/common/utilities/log.utils";
import { BadRequestException } from "@nestjs/common";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export const tryCatch = <
  T extends () => ReturnType<T>,
  E extends (_args: any) => ReturnType<E>,
>(
  fn: T,
  handle: E,
) => {
  try {
    return fn();
  } catch (error) {
    return handle(error);
  }
};

export const tryCatchPromise = async <
  T,
  E extends (_args: any) => ReturnType<E>,
>(
  fn: () => Promise<T>,
  handleError: E,
) => {
  try {
    return await fn();
  } catch (error) {
    return handleError(error);
  }
};

export const tryOrNull = <T extends (..._args: Parameters<T>) => ReturnType<T>>(
  fn: T,
) => tryCatch(fn, () => null);

export const tryOr = <T extends (..._args: Parameters<T>) => ReturnType<T>, R>(
  defaultValue: R,
  fn: T,
) => tryCatch(fn, () => defaultValue);

export const tryOrThrow = <
  T extends (..._args: Parameters<T>) => ReturnType<T>,
>(
  fn: T,
  throwWith: any,
) =>
  tryCatch(fn, () => {
    throw throwWith;
  });

export const tryPromiseOrThrow = async <T>(
  fn: () => Promise<T>,
  throwWith: any,
) =>
  await tryCatchPromise(fn, () => {
    throw throwWith;
  });

export const tryZodParse = <T extends z.ZodTypeAny>(
  schema: T,
  object: any,
): z.infer<typeof schema> =>
  tryCatch(
    () => schema.parse(object),
    (error) => {
      delog("tryZodParse", "error", error);
      throw new BadRequestException(fromZodError(error).message);
    },
  );
