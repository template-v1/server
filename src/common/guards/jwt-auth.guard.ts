/**
 * hàm này để xác thực JWT trong NestJS.
 * Nó kế thừa từ AuthGuard của Passport và sử dụng chiến lược 'jwt'.
 * Nó cũng sử dụng Reflector để kiểm tra xem route có được đánh dấu là public hay không.
 * Nếu route là public, nó sẽ cho phép truy cập mà không cần xác thực.
 * --> kiểm tra xác thực JWT cho các route
 */

import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
}
