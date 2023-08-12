import { ConfigModule } from '@nestjs/config'
import { EmailService } from './email/service/email.service';
import { FileService } from './files/file/file.service';
import { ListasModule } from 'src/listas/listas.module';
import { Module } from '@nestjs/common';
import { PdfService } from './pdf/pdf.service';
import { ReportesService } from './reportes/reportes/reportes.service';

@Module({
  imports:[ConfigModule,ListasModule],
  providers: [EmailService, PdfService, FileService, ReportesService],
  exports:[EmailService,PdfService,FileService,ReportesService]
})
export class UtilsModule {}
