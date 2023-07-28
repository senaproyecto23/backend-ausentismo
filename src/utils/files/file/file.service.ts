import * as AWS from 'aws-sdk';

import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {

    s3:AWS.S3;
    constructor(private configService: ConfigService){
        this.s3 = new AWS.S3({
            accessKeyId: configService.get('AWS_ACCES_KEY'),
            secretAccessKey: configService.get('AWS_SECRET_KEY'),
            region: configService.get('AWS_REGION'),
        })
    }


    async saveFileS3(file: Express.Multer.File):Promise<string>{
        const fileName:string = this.getRandomId()+'_'+file.originalname;
        const uploadParams = {
            Bucket: this.configService.get('AWS_BUCKET'),
            Key: fileName,
            Body: file.buffer,
          };
          const result = await this.s3.upload(uploadParams).promise();
          console.log(result)
          return fileName;
    }


    private getRandomId():string{
        return Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
    }


    async getFileS3(key:string): Promise<Buffer>{
        const params = {
            Bucket: this.configService.get('AWS_BUCKET'),
            Key: key,
        };
        
        const result = await this.s3.getObject(params).promise();
        return result.Body as Buffer;
    }
}
