import { envSchema } from "@/config";
import { z } from "zod";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.output<typeof envSchema> {}
  }
}
