import { ConfigModule } from '@nestjs/config'
import { EmailService } from './email/service/email.service';
import { FileService } from './files/file/file.service';
import { Module } from '@nestjs/common';
import { PdfService } from './pdf/pdf.service';

@Module({
  imports:[ConfigModule],
  providers: [EmailService, PdfService, FileService],
  exports:[EmailService,PdfService,FileService]
})
export class UtilsModule {}
