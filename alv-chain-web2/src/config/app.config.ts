import z, { ZodError } from "zod";

import { tryCatch } from "@/common/utilities/error.utils";
import * as dotenv from "dotenv";
import { fromZodError } from "zod-validation-error";
dotenv.config();

export const envSchema = z
  .object({
    REDIS_HOST: z.string().default("localhost"),
    REDIS_PORT: z.coerce.number().default(6379),
    REDIS_PASSWORD: z.string().optional(),
    DEBUG_LOG: z.coerce.boolean().default(false),
    WARN_LOG: z.coerce.boolean().default(true),
    ERROR_LOG: z.coerce.boolean().default(true),
    REQ_LOG: z.coerce.boolean().default(true),
    LOG_FILE: z.coerce.boolean().default(true),
    JWT_BEARER_SECRET: z.string(),
    JWT_REFRESH_SECRET: z.string(),
    JWT_SECRET: z.string(),
    PORT: z.coerce.number().default(5000),
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    MAILER_HOST: z.string(),
    MAILER_PORT: z.coerce.number(),
    MAILER_SECURE: z.coerce.boolean(),
    MAILER_USER: z.string(),
    MAILER_PASSWORD: z.string(),
    MAILER_FROM: z.string(),
  })
  .transform((envs) => {
    return {
      ...envs,
      REDIS_URL: !!envs.REDIS_PASSWORD
        ? `redis://:${envs.REDIS_PASSWORD}@${envs.REDIS_HOST}:${envs.REDIS_PORT}`
        : `redis://${envs.REDIS_HOST}:${envs.REDIS_PORT}`,
    };
  });

const env = tryCatch(
  () =>
    envSchema.parse(
      Object.entries(process.env).reduce(
        (prev, [key, val]) => ({
          ...prev,
          [key]: (() => {
            try {
              if (val) return JSON.parse(val);
              return val;
            } catch (error) {
              return val;
            }
          })(),
        }),
        {},
      ),
    ),
  (error: unknown) => {
    if (error instanceof ZodError)
      throw new Error(`ENV ${fromZodError(error).message}`);
    else throw new Error(`ENV ${error}`);
  },
);

export const appConfig = {
  default_schema_identifier: "public",
  default_migrations_folder: __dirname + "/../database/migrations",
  default_seeders_folder: __dirname + "/../database/seeders",
  tenant_migrations_folder: __dirname + "/../database/tenant_migrations",
  tenant_seeders_folder: __dirname + "/../database/tenant_seeders",
  recommended_bcrypt_rounds: 12,
  email_from: "mailer@schmserver.com",
  env,
  IS_PRIMARY_CLUSTER:
    process.env.NODE_APP_INSTANCE === undefined ||
    process.env.NODE_APP_INSTANCE === "0",
    
  STORAGE_SERVICE_ACCESS_KEY: process.env.STORAGE_SERVICE_ACCESS_KEY!,
  STORAGE_SERVICE_SECRET_KEY: process.env.STORAGE_SERVICE_SECRET_KEY!,
  STORAGE_SERVICE_ENDPOINT: process.env.STORAGE_SERVICE_ENDPOINT || "localhost",
  STORAGE_SERVICE_PORT: +process.env.STORAGE_SERVICE_PORT! || undefined,
  STORAGE_SERVICE_USE_SSL:
    process.env.STORAGE_SERVICE_USE_SSL?.toLowerCase() === "true",
  STORAGE_SERVICE_BUCKET_NAME: process.env.STORAGE_SERVICE_BUCKET_NAME!,
};
