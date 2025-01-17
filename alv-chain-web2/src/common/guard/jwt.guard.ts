import { elog } from "@/common/utilities/log.utils";
import { CanActivate, Injectable, UnauthorizedException } from "@nestjs/common";
import { decode } from "jsonwebtoken";
import { Observable } from "rxjs";
@Injectable()
export class JwtGuard implements CanActivate {
  canActivate(
    context: any,
  ): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
    try {
      const bearerToken = context.switchToHttp().getRequest()
        .headers.authorization;
      const token = bearerToken?.split("Bearer ")[1];
      const decoded = decode(token);
      if (!decoded)
        throw new UnauthorizedException("You are not authenticated");
      context.switchToHttp().getRequest().user = decoded;
      return true;
    } catch (ex) {
      elog(ex);
      throw new UnauthorizedException("You are not authenticated");
    }
  }
}
