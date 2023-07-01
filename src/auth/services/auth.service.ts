import * as bcrypt from 'bcrypt';

import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';

import { EmailService } from '../../utils/email/service/email.service';
import { EmpleadoEntity } from 'src/empleados/entities/empleado.entity';
import { EmpleadosService } from '../../empleados/services/empleados.service';
import { JwtService } from '@nestjs/jwt';
import { MailTemplate } from 'src/utils/email/models/mail-template.model';
import { RegisterDto } from '../dto/register.dto';
import { ResetPasswordDTO } from '../dto/reset-password.dto';
import { ResetPasswordParams } from 'src/utils/email/models/resetpassword.params';
import { UsersService } from 'src/users/services/users.service';
import { WelcomeParams } from 'src/utils/email/models/welcome';

@Injectable()
export class AuthService {

    constructor(
        private userService:UsersService,
        private empleadosService:EmpleadosService,
        private jwtService:JwtService,
        private emailService:EmailService){}


    async login(email:string, password:string):Promise<string>{
        const user = await this.userService.findByEmail(email);
        if( ! user)  throw new HttpException('Usuario o contraseña no válidos', HttpStatus.NOT_FOUND);
        const passwordMatch = await this.comparePassword(password,user.password)
        if( ! passwordMatch ) throw new HttpException('Usuario o contraseña no válidos', HttpStatus.NOT_FOUND);
        const empleado = await this.empleadosService.findByUserId(user.id);
        const token = await this.getToken({id:user.id, empleado: empleado.documento ,email: user.email,rol:user.rol});
        return token;
    }


    async register(registerDto:RegisterDto):Promise<EmpleadoEntity>{
        try{
            const userDB = await this.userService.findByEmail(registerDto.email);
            if(userDB) throw new HttpException('Usuario ya existe', HttpStatus.BAD_REQUEST);

            const empleadoDB = await this.empleadosService.findByDocument(registerDto.documento)
            if(empleadoDB) throw new HttpException('Ya existe un empleado con el mismo documento', HttpStatus.BAD_REQUEST);

            const user = await this.userService.save({
                email:registerDto.email,
                password: await this.encriptPassword(registerDto.password),
                rol: registerDto.rol
            })
    
            const empleado = await this.empleadosService.save({
                nombre:registerDto.nombre,
                apellido:registerDto.apellido,
                tipoDocumento:registerDto.tipoDocumento,
                documento:registerDto.documento,
                genero:registerDto.genero,
                fechaNacimiento:registerDto.fechaNacimiento,
                telefono:registerDto.telefono,
                lugarNacimiento:registerDto.lugarExpedicion,
                usuarioId:user.id
            });

            const mailTemplate:MailTemplate<WelcomeParams> = {
                id: 2,
                to: user.email,
                params:{
                  user : user.email,
                  password:registerDto.password,
                  app: String(process.env.FRONT_DOMAIN)
                }
            }
            const data = await this.emailService.sendWelcome(mailTemplate);
            console.log({data})

            return empleado;

        }catch(err){
            console.log(err)
            if(err.status === HttpStatus.BAD_REQUEST){ throw err;
            }else
                throw new HttpException('Ocurrió un error intenta más tarde', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async forgotPassword(email:string): Promise<string>{
    
        const user  = await this.userService.findByEmail(email);
        console.log({user})
        if( ! user)  throw new HttpException('Usuario inválido', HttpStatus.NOT_FOUND);
        const token = await this.getToken({id:user.id, email: user.email,rol:user.rol},'1d');
        user.token  = token;
        await this.userService.update(user,{token:user.token});
        const mailTemplate:MailTemplate<ResetPasswordParams> = {
            id: 1,
            to: user.email,
            params:{
              token : token,
              app: String(process.env.FRONT_DOMAIN)
            }
          }
        const data = await this.emailService.sendResetPassword(mailTemplate);
        console.log({data})
        const messagge = `Te hemos enviado un correo a  ${user.email} con los pasos para restablecer tu contraseña.`;
        return messagge;
    }

    async  resetPassword(resetPassword:ResetPasswordDTO):Promise<string>{
        try {
            await this.verifyToken(resetPassword.token);
            const user  = await this.userService.findByEmail(resetPassword.email);
            if( ! user)  throw new HttpException('Usuario invalido', HttpStatus.NOT_FOUND);
            user.password = await this.encriptPassword(resetPassword.password);
            await this.userService.update(user,{password:user.password});
            return 'Cambio de contraseña con éxito.';
        } catch (error) {
            if(error.status === HttpStatus.NOT_FOUND){ throw error;
            }else
                throw new UnauthorizedException({error: 'No autorizado'});
        }
    }


    getToken(payload:any,expired:string='1h'):Promise<string>{
        return this.jwtService.signAsync(payload,{expiresIn:expired});
    }

    verifyToken(token:string):Promise<any>{
        return this.jwtService.verifyAsync(token);
    }

    async encriptPassword(password:string):Promise<string>{
        const salt = await  bcrypt.genSalt();
        return bcrypt.hash(password,salt);
    }

    async comparePassword(password, hash):Promise<boolean>{
        return bcrypt.compare(password,hash);
    }

}
