import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from 'src/auth/services/auth.service';
import { Reflector } from '@nestjs/core';
import { RequestUtil } from 'src/auth/utils/request.util';

@Injectable()
export class RoleGuard implements CanActivate {
  
  constructor(private authService:AuthService,private reflector: Reflector) {}

  async canActivate(context: ExecutionContext):Promise<boolean>  {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) { return true; }
    
    try {
      const request = context.switchToHttp().getRequest();
      console.log({request})
      const token = RequestUtil.getAutorizationHeader(request);
      if (!token) throw new HttpException('no autorizado', HttpStatus.UNAUTHORIZED);
      const tokenData = await this.authService.verifyToken(token);
      const isvalid = roles.some(rol => rol == tokenData.rol);
      if( ! isvalid ) throw new HttpException('no autorizado', HttpStatus.UNAUTHORIZED);
    } catch (error) {
      console.log({error})
      throw new HttpException('no autorizado', HttpStatus.UNAUTHORIZED);
    }

    return true
  }
}
