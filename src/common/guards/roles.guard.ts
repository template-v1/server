/**
 * hàm này định nghĩa một guard trong NestJS để kiểm tra quyền truy cập dựa trên vai trò của người dùng.
 * Nó sử dụng Reflector để lấy metadata về các vai trò yêu cầu từ route.  
 * Nếu không có vai trò yêu cầu, guard sẽ cho phép truy cập.
 * Nếu có vai trò yêu cầu, nó sẽ kiểm tra xem người dùng có các vai trò đó hay không.
 * --> kiểm tra quyền truy cập dựa trên vai trò của người dùng
 */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [ // lấy metadata roles từ route
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    if (!user) return false;

    return requiredRoles.some(role => user.roles?.includes(role)); // kiểm tra xem user có quyền truy cập với các role yêu cầu hay không
  }
}
