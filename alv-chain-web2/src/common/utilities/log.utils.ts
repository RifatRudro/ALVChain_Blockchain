import { tryOr } from "@/common/utilities/error.utils";
import { appConfig } from "@/config";
import { appendFile } from "fs/promises";

const appendToLogFile = async (
  level: string,
  message?: any,
  ...optionalParams: any[]
) => {
  if (!appConfig.env.LOG_FILE) return;
  const logMessage = `${new Date().toUTCString()}: ${tryOr(message, () =>
    JSON.stringify(message, null, 2),
  )} ${
    optionalParams.length === 0
      ? ""
      : tryOr(optionalParams, () => JSON.stringify(optionalParams, null, 2))
  }\n`;
  await appendFile(`${level.toLowerCase()}.log`, logMessage);
};

export const delog = (message?: any, ...optionalParams: any[]) => {
  if (!appConfig.env.DEBUG_LOG) return;
  console.log(message, ...optionalParams);
  appendToLogFile("DEBUG", message, ...optionalParams);
};

export const glog = (
  level: string,
  message?: any,
  ...optionalParams: any[]
) => {
  if (!appConfig.env.DEBUG_LOG) return;
  console.debug(message, ...optionalParams);
  appendToLogFile(level, message, ...optionalParams);
};

export const wlog = (message?: any, ...optionalParams: any[]) => {
  if (!appConfig.env.WARN_LOG) return;
  console.warn(message, ...optionalParams);
  appendToLogFile("WARN", message, ...optionalParams);
};

export const elog = (message?: any, ...optionalParams: any[]) => {
  if (!appConfig.env.ERROR_LOG) return;
  console.error(message, ...optionalParams);
  appendToLogFile("ERROR", message, ...optionalParams);
};
export const reqlog = (message?: any, ...optionalParams: any[]) => {
  if (!appConfig.env.ERROR_LOG) return;
  console.debug(message, ...optionalParams);
  appendToLogFile("REQUEST", message, ...optionalParams);
};

export const logErrorAndReturn =
  <T>(returnVal: T, message?: any, ...optionalParams: any[]) =>
  (error: any) => {
    elog(message, ...optionalParams, error);
    return returnVal;
  };
