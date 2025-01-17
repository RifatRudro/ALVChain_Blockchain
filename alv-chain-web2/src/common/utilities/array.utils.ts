import { getRandomNumberBetween } from "@/common/utilities/number.utils";

export const commonArrayItems = <T>(arrays: T[][]) =>
  (arrays.shift() || []).filter((v) =>
    arrays.every((a) => a.indexOf(v) !== -1),
  );

export const getRandomItemFromArray = <T>(arr: T[]) =>
  arr[getRandomNumberBetween(0, arr.length - 1)] || undefined;
