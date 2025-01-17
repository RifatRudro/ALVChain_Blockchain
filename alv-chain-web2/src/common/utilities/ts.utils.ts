import { followsSchema } from "@/common/utilities/zod.utils";
import { z } from "zod";

export {};

declare global {
  function nameof<T>(nameFn: () => T): string;
}

const _global = global as any;
_global.nameof = function <T>(nameFn: () => T) {
  return /return (.*);/.exec(nameFn.toString())?.[1] ?? "";
};

export const hasProperty = (obj: unknown, prop: string) =>
  followsSchema(obj, z.object({ [prop]: z.any() }));
