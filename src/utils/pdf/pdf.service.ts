import * as PDFDocument from 'pdfkit';
import * as moment from 'moment';
import * as path from 'path';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PdfData } from './models/pdf-data';

@Injectable()
export class PdfService {

    async generate(data:PdfData):Promise<any>{

        try {
            const doc =  new PDFDocument({size:'A4'});
    
            const imagePath = path.join(path.resolve('src'),'assets/logo.png') 
            doc.image(imagePath,255,100,{
                    align:'center',
                    valign:'center'
                }
            )
            doc.fontSize(20)
            .text('SOLICITUD DE PERMISO',200,300)
            .fontSize(10)
            .text(`funcionario(a) ${data.nombre} ${data.apellido}`,100,350)
            .text(`Cédula:  ${data.empleadoDocumento}`,100,380)
            .text(`Fecha diligenciamiento:  ${this.parseDate(data.fechaCreacion)}`,100,410)
            .text(`Solicito se me conceda`,100,440)
            .list([`${this.getDays(data.fechaInicio,data.fechaFin)} día(s) a partir del  ${this.parseDate(data.fechaInicio)}`,''],100,460)
            .list([`${this.getHoras(data.horaIncio.toString(),data.horaFin.toString())} hora(s)`,''],100,480)
            .fontSize(15)
            .text(`Motivo`,100,500)
            .fontSize(10)
            .text(`${data.motivo}`,100,530)
            .fontSize(10)
            .list(['Autorización: ______________________________________',],100,560)
            .list(['Observaciones:______________________________________'],100,600)  
            .fontSize(10)
            .text('SRIA. ADMINISTRATIVA Y FINANCIERA',100,670)
            .text('CONTRALOR DEPARTAMENTAL',360,670)
            .text('__________________________________',100,720)
            .text('_____________________________',360,720)
    
            return doc;
        } catch (error) {
            console.log({error})
            throw new HttpException('Ocurrió un error intenta más tarde', HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


    getDays(fecha1:Date,fecha2:Date): number{
        // To calculate the time difference of two dates
        const difference_In_Time = fecha2.getTime() - fecha1.getTime();
        // To calculate the no. of days between two dates
        const difference_In_Days = difference_In_Time / (1000 * 3600 * 24);
        return difference_In_Days;
    }

     getHoras(hora1:string,hora2:string):number{
        const h1 = moment(hora1,'HH:mm')
        const h2 = moment(hora2,'HH:mm')
        return h2.diff(h1, 'hours')  
     }

    parseDate(fecha1:Date):string{
        return fecha1.toLocaleDateString('es-CO',{weekday:"long", year:"numeric", month:"long", day:"numeric"});
    }
}
