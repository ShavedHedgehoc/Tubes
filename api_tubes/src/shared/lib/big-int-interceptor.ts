import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class BigIntInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    return next.handle().pipe(map((data: unknown) => this.transform(data)));
  }

  private transform(obj: unknown): unknown {
    if (obj === null || obj === undefined) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map((item: unknown) => this.transform(item));
    }

    if (typeof obj === "bigint") {
      return Number(obj);
    }

    if (typeof obj === "object") {
      if (obj instanceof Date) {
        return obj;
      }
      const transformedObj = { ...(obj as Record<string, unknown>) };

      for (const key in transformedObj) {
        if (Object.prototype.hasOwnProperty.call(transformedObj, key)) {
          transformedObj[key] = this.transform(transformedObj[key]);
        }
      }
      return transformedObj;
    }

    return obj;
  }
}
