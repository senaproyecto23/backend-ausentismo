import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from '../../services/auth.service';
import { RequestUtil } from 'src/auth/utils/request.util';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthService) {}


  async canActivate(context: ExecutionContext):Promise<boolean>{

    const request = context.switchToHttp().getRequest();
    const token = RequestUtil.getAutorizationHeader(request);
    if (!token) throw new HttpException('no autorizado', HttpStatus.UNAUTHORIZED);

    try {
      const tokenData = await this.authService.verifyToken(token);
      request['user'] = tokenData;
    } catch (error) {
      throw new HttpException('no autorizado', HttpStatus.UNAUTHORIZED);
    }
    return true;
  }

}
