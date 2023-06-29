/* eslint-disable prettier/prettier */
import { Body, Controller,Post  } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { ResetPasswordDTO } from '../dto/reset-password.dto';


@Controller('auth')
export class AuthController {

  constructor(private authService:AuthService){}

  @Post('login')
  async login(@Body() loginDTO:LoginDto) {
    const token = await this.authService.login(loginDTO.email,loginDTO.password);
    return {token} ;
  }


  @Post('forgot-password')
  async forgotPassword(@Body('email') email:string) {
    const response =  await this.authService.forgotPassword(email) ;
    return {response};
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPassword:ResetPasswordDTO) {
    const response =  await this.authService.resetPassword(resetPassword) ;
    return {response};
  }


}
