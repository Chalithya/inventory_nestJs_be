import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { UserRole } from '../user/user-role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<UserRole[]>(
      'roles',
      context.getHandler(),
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return false;
    }

    const token = authHeader.split('Bearer ')[1];

    try {
      const decodedToken = jwt.verify(
        token,
        'secretsecretsecretsecretsecretsecret',
      );

      if (typeof decodedToken === 'object' && 'role' in decodedToken) {
        const userRole = decodedToken['role'];

        if (requiredRoles.includes(userRole) || userRole === UserRole.Admin) {
          return true;
        }
      }
    } catch (error) {
      throw new UnauthorizedException('Unauthorized');
    }

    return false;
  }
}
