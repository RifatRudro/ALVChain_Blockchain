import { TimeoutInterceptor } from "@/common/interceptors/timeout-interceptors";
import { applyDecorators, SetMetadata, UseInterceptors } from "@nestjs/common";

const SetTimeout = (timeout: number) => SetMetadata("request-timeout", timeout);

export function SetRequestTimeout(timeout = 600000) {
  return applyDecorators(
    SetTimeout(timeout),
    UseInterceptors(TimeoutInterceptor),
  );
}
