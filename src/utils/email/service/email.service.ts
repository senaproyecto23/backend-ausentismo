import * as SibApiV3Sdk from 'sib-api-v3-sdk'

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config'
import { MailTemplate } from '../models/mail-template.model';
import { ResetPasswordParams } from '../models/resetpassword.params';
import { WelcomeParams } from '../models/welcome';

@Injectable()
export class EmailService {

    constructor(private configService:ConfigService){}

    async sendResetPassword(mailTemplate:MailTemplate<ResetPasswordParams>):Promise<any>{
        
        try {
            SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = this.configService.get('MAIL_TOKEN');
            const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
            let email = {
                to: [{email:  mailTemplate.to}],
                templateId: mailTemplate.id,
                params: {
                    app: mailTemplate.params.app,
                    token:  mailTemplate.params.token,
                },
                headers: {
                    'X-Mailin-custom': `api-key:${process.env.MAIL_TOKEN}|content-type:application/json|accept: application/json`
                }
              };
              
              const dataResponse = await apiInstance.sendTransacEmail(email);
              return dataResponse;
        } catch (error) {
            console.log({error})
            throw new HttpException('Oupss ocurrio un error enviando el email!!', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async sendWelcome(mailTemplate:MailTemplate<WelcomeParams>):Promise<any>{
        
        try {
            SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = this.configService.get('MAIL_TOKEN');
            const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
            let email = {
                to: [{email:  mailTemplate.to}],
                templateId: mailTemplate.id,
                params: {
                    app: mailTemplate.params.app,
                    user:mailTemplate.params.user,
                    password:mailTemplate.params.password
                },
                headers: {
                    'X-Mailin-custom': `api-key:${process.env.MAIL_TOKEN}|content-type:application/json|accept: application/json`
                }
              };
              
              const dataResponse = await apiInstance.sendTransacEmail(email);
              return dataResponse;
        } catch (error) {
            console.log({error})
            throw new HttpException('Oupss ocurrio un error enviando el email!!', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
