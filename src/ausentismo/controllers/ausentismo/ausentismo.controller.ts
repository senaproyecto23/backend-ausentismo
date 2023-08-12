import { Body, Controller, Get, Header, HttpException, HttpStatus, Param, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AusentismoDto } from 'src/ausentismo/dto/ausentismo.dto';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { AusentismoService } from '../../services/ausentismo/ausentismo.service';
import { UpdateAusentismoDTO } from 'src/ausentismo/dto/update-ausentismo-dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesEnum } from 'src/auth/models/roles.enum';
import { RoleGuard } from 'src/auth/guards/role/role.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

import { FileService } from 'src/utils/files/file/file.service';
import { Reporte } from 'src/ausentismo/dto/reporte.dto';


@Controller('ausentismo')
export class AusentismoController {


    constructor(private ausentismoService:AusentismoService,
        private fileService:FileService){}


 

    @UseGuards(AuthGuard)
    @Post('crear')
    @UseInterceptors(FileInterceptor('file'))
    async create( @Req() request: any,@UploadedFile() file: Express.Multer.File) {
        // Obtener datos del formData
        const ausentismoDto:AusentismoDto = JSON.parse(request.body.data);
        const result = await this.ausentismoService.save(ausentismoDto,file);
        return result;
    }



    @UseGuards(AuthGuard)
    @Get('documentos/:ausentismoId')
    async getDocumentsByAusentismoId(@Param() params: any){
        const result = await this.ausentismoService.findDocumentsByAusentismoId(params.ausentismoId);
        console.log({result})
        return result
    }

  
    @UseGuards(AuthGuard)
    @Get('documentos/pdf/:docName')
    @Header('Content-Type','application/pdf')
    @Header('Content-Disposition','attachment; filename="documento.pdf"')
    async getDocumentos(@Param() params: any,@Res() response) {
        try {
            const fileBuffer = await this.fileService.getFileS3(params.docName)
            response.send(fileBuffer)
          } catch (error) {
            console.error('Error al obtener el archivo PDF', error);
            response.status(500).send('Error interno del servidor');
        }
    }


    @UseGuards(AuthGuard)
    @Get('/:id')
    async getById(@Param() params: any){
        const result = await this.ausentismoService.findById(params.id);
        return result
    }


    @UseGuards(AuthGuard)
    @Get('autorizaciones/:supervisorId')
    async autorizaciones(@Param() params: any){
        const result = await this.ausentismoService.findAllBySupervisorId(params.supervisorId);
        return result
    }


    @UseGuards(AuthGuard)
    @Get('historial/:document')
    async historial(@Param() params: any){
        const result = await this.ausentismoService.findAll(params.document);
        return result
    }

    //@UseGuards(AuthGuard)
    @Get('pdf/:id')
    @Header('Content-Type','application/pdf')
    @Header('Content-Disposition','attachment; filename="ausentismo.pdf"')
    async getPdf(@Param() params: any,@Res() response) {
        const pdf = await this.ausentismoService.getPdf(params.id);
        pdf.pipe(response)
        return  pdf.end();
    }

    @UseGuards(AuthGuard)
    @UseGuards(RoleGuard)
    @Roles(RolesEnum.SUPERVISOR)
    @Post('update')
    async update(@Body() data:UpdateAusentismoDTO){
        const result = await this.ausentismoService.update(data)
        if(result.affected <= 0) throw new HttpException('ocurrio un error actualizando el registro', HttpStatus.INTERNAL_SERVER_ERROR);
        return {result:'actualización exitosa'};
    }


   // @UseGuards(AuthGuard)
   // @UseGuards(RoleGuard)
   // @Roles(RolesEnum.SUPERVISOR)
   @Post('reporte')
    async getExcel(@Body() reporte: Reporte,@Res() res: Response) {
      const workbook = await this.ausentismoService.reporte(reporte.fecha,reporte.estado);
      res.setHeader('Content-Disposition', 'attachment; filename=reporte.xlsx');
      res.setHeader('Content-Type','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  
      await workbook.xlsx.write(res);
    }

}
 

