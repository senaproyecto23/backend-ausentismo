import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AusentismoEntity } from 'src/ausentismo/entities/ausentismo.entity';
import { Repository, UpdateResult } from 'typeorm';
import { Estados } from 'src/ausentismo/models/estados.enum';
import { AusentismoDto } from 'src/ausentismo/dto/ausentismo.dto';
import { EmpleadosService } from '../../../empleados/services/empleados.service';
import { PdfService } from '../../../utils/pdf/pdf.service';
import { UpdateAusentismoDTO } from 'src/ausentismo/dto/update-ausentismo-dto';
import { FileService } from 'src/utils/files/file/file.service';
import { AusentismoDocumentsEntity } from 'src/ausentismo/entities/ausentismo-documents.entity';



@Injectable()
export class AusentismoService {

    constructor( 
        @InjectRepository(AusentismoEntity)
        private ausentismoRepository:Repository<AusentismoEntity>,
        @InjectRepository(AusentismoDocumentsEntity)
        private ausentismoDocRepository:Repository<AusentismoDocumentsEntity>,
        private empleadoService:EmpleadosService,
        private pdfService:PdfService,
        private fileService:FileService){}


    async save(ausentismo:AusentismoDto,file: Express.Multer.File):Promise<AusentismoEntity>{

        let ausentismoDB = await this.ausentismoRepository.findOne({where:{empleadoDocumento:ausentismo.documentoEmpleado, estado:Estados.PENDIENTE, activo:true}});
 
        if( ausentismoDB ) throw new HttpException(' ya existe un certificado pendiente', HttpStatus.BAD_REQUEST);

        ausentismoDB = await this.ausentismoRepository.findOne({where:{empleadoDocumento:ausentismo.documentoEmpleado,fechaInicio:ausentismo.fechaInicio, activo:true}});
 
        if( ausentismoDB ) throw new HttpException(' ya existe un certificado para esa fecha', HttpStatus.BAD_REQUEST);
 
        const ausentismoEntity:AusentismoEntity = {
            fechaInicio: ausentismo.fechaInicio,
            fechaFin:ausentismo.fechaFin,
            horaInicio:ausentismo.horaInicio,
            horaFin:ausentismo.horaFin,
            motivo: ausentismo.motivo,
            empleadoDocumento: ausentismo.documentoEmpleado,
            estado: Estados.PENDIENTE,
            activo: true,
            fechaCreacion: new Date(),
            supervisorId:ausentismo.supervisorId
        }

        const result  = await this.ausentismoRepository.save(ausentismoEntity);
        const fileName:string = await this.fileService.saveFileS3(file)
        if(! fileName) return result;
        const document = {ausentismoId:result.id,empleadoDocumento:ausentismo.documentoEmpleado,pathDocumento:fileName}
        await this.ausentismoDocRepository.save(document);
        return result
    }   


 
    findAll(document:string):Promise<AusentismoEntity[]>{
        return this.ausentismoRepository.find({where:{empleadoDocumento:document}});
    }

    findAllBySupervisorId(supervisorId:number):Promise<AusentismoEntity[]>{
        return this.ausentismoRepository.find({where:{supervisorId:supervisorId,estado:Estados.PENDIENTE}});
    }

    findById(id:number):Promise<AusentismoEntity>{
        return this.ausentismoRepository.findOne({where:{id} });
    }


    findDocumentsByAusentismoId(ausentismoId:number):Promise<AusentismoDocumentsEntity>{
        return this.ausentismoDocRepository.findOne({where:{ausentismoId: ausentismoId}});
    }


    async getPdf(idAusentismo:number){
        const ausentismo = await this.findById(idAusentismo);
        if( ! ausentismo ) throw new HttpException('Certificado no encontrado', HttpStatus.NOT_FOUND);

        const empleado =  await this.empleadoService.findByDocument(ausentismo.empleadoDocumento);
        if( ! empleado ) throw new HttpException('Empleado no encontrado', HttpStatus.NOT_FOUND);

        const pdf = await this.pdfService.generate({
                                                    nombre: empleado.nombre,
                                                    empleadoDocumento:empleado.documento,
                                                    apellido: empleado.apellido,
                                                    fechaCreacion: ausentismo.fechaCreacion,
                                                    fechaInicio: ausentismo.fechaInicio,
                                                    fechaFin: ausentismo.fechaFin,
                                                    horaIncio: ausentismo.horaInicio,
                                                    horaFin: ausentismo.horaFin,
                                                    motivo: ausentismo.motivo,
                                                });

        return pdf;
    }


    async update(update: UpdateAusentismoDTO):Promise<UpdateResult>{
        const ausentismo = await this.findById(update.id);
        if( ! ausentismo ) throw new HttpException('Certificado no encontrado', HttpStatus.NOT_FOUND);
        return this.ausentismoRepository.update(ausentismo.id,{estado:update.estado,observacion:update.observacion,activo:false});;
    }
}
