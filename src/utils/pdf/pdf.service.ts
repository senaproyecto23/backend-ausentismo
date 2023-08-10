import * as PDFDocument from 'pdfkit';
import * as moment from 'moment';
import * as path from 'path';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PdfData } from './models/pdf-data';

@Injectable()
export class PdfService {

    async generate(data:PdfData):Promise<any>{

        try {
            const doc =  new PDFDocument({size:'TABLOID'});
            this.createTabla(doc);
            doc.fontSize(20)
            .text('SOLICITUD DE PERMISO',300,140)
            this.createTableBody(doc)
    /*
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
            .text(`${data.contingencia}`,100,530)
            .fontSize(10)
            .list(['Autorización: ______________________________________',],100,560)
            .list(['Observaciones:______________________________________'],100,600)  
            .fontSize(10)
            .text('SRIA. ADMINISTRATIVA Y FINANCIERA',100,670)
            .text('CONTRALOR DEPARTAMENTAL',360,670)
            .text('__________________________________',100,720)
            .text('_____________________________',360,720)
    */
            return doc;
        } catch (error) {
            console.log({error})
            throw new HttpException('Ocurrió un error intenta más tarde', HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    createTabla(doc){
        // Dibujar la tabla en el documento
        this.drawTable(doc);            
    }

    // Función para dibujar la tabla
    drawTable(doc) {
        this.createHeader(doc)
    }

    drawCell(doc,text, x, y, width, height) {
        // Configurar las propiedades de la tabla
        const cellPadding = 10;
        const fontSize = 12;
        doc.rect(x, y, width, height).stroke();
        doc.fontSize(fontSize).text(text, x + cellPadding, y + cellPadding, { width: width - cellPadding * 2 });
    }

    drawCellWithImage(doc, x, y, width, height){
        const imagePath = path.join(path.resolve('src'),'assets/logo.png') 
        doc.rect(x, y, width, height).stroke();
        doc.image(imagePath,x+7,y+7,{
                align:'center',
                valign:'center',
                scale: 0.65
            }
        )
    }

    createHeader(doc){
        const width =100;
        const height = 90;
        this.drawCellWithImage(doc, 150, 20, width, height);
        this.drawCell(doc, 'encabezado', 250, 20, 400, 40);
        this.drawCell(doc, 'proceso', 250, 60, 180, 50);
        this.drawCell(doc, 'codigo', 430, 60, 120, 50);
        this.drawCell(doc, 'version', 550, 60, 100, 50);

    }

    createTableBody(doc){
          // Configurar las propiedades de la tabla
        const width_c1 = 500;
        const height_c1 =  30;
        const posX_c1 = 150;
        const posY_c1 = 170
        this.drawCell(doc, 'fecha solicitud', posX_c1, posY_c1, width_c1, height_c1);
        this.drawCell(doc, 'funcionario', posX_c1, 200, width_c1, height_c1);
        this.drawCell(doc, 'cedula', posX_c1, 230, width_c1, height_c1);
        this.drawCell(doc, 'cargo', posX_c1, 260, width_c1, height_c1);
        this.drawCell(doc, 'dependecia', posX_c1, 290, width_c1, height_c1);
        this.drawCell(doc, 'causal de solicitud', posX_c1, 320, width_c1, 485);
        this.createCausalTable(doc)
        this.drawCell(doc, 'Fecha del permiso, estímulo o compensatorio:', posX_c1, 805, width_c1, 110);
        this.createFechaAusentismo(doc)
        this.drawCell(doc, 'Observaciones:', posX_c1, 915, width_c1, 70);
        this.createFirmas(doc)
    }

    createFirmas(doc){
        const posX_c1 = 150;
        const posY_c1 = 170
        doc.text('____________________________',posX_c1,1050)
        doc.text('Funcionario',posX_c1,1065)
        doc.text('____________________________',posX_c1+300,1050)
        doc.text('Superior Inmediato',posX_c1+300,1065)
        doc.text('______________________________',posX_c1,1120)
        doc.text('Secretaria Administrativa y Financiera',posX_c1,1135)
        doc.text('______________________________',posX_c1+300,1120)
        doc.text('Contralor Departamental',posX_c1+300,1135)
        //doc.text('fecha',posX_c1,1140)
       
    }

    createFechaAusentismo(doc){
        const width_c1 = 240;
        const height_c1 =  25;
        const posX_c1 = 159;
        const posY_c1 = 830
        ///////////////////////
        const posX_c2 = 400;
        const posY_c2 = 830;
        const width_c2 = 240;
        const height_c2 =  25;
        let currentPosY = (posY_c1 + height_c1);

        for (let index = 1; index <=3; index++) {
            if(index == 1){
                this.drawCell(doc, '--'+index, posX_c1, posY_c1, width_c1, height_c1);
                this.drawCell(doc, 'contenido', posX_c2, posY_c2, width_c2, height_c2);
            }else{
                this.drawCell(doc, '--'+index, posX_c1, currentPosY, width_c1, height_c1);
                this.drawCell(doc, 'contenido', posX_c2, currentPosY, width_c2, height_c2);
                currentPosY += height_c1
            }
        }
      
    }

    createCausalTable(doc){
        const width_c1 = 400;
        const height_c1 =  30;
        const posX_c1 = 159;
        const posY_c1 = 350
        ///////////////////////
        const posX_c2 = 560;
        const posY_c2 = 350;
        const width_c2 = 79;
        const height_c2 =  30;
        let currentPosY = (posY_c1 + height_c1);

        for (let index = 1; index <=  15; index++) {
            if(index == 1){
                this.drawCell(doc, '--'+index, posX_c1, posY_c1, width_c1, height_c1);
                this.drawCell(doc, 'contenido', posX_c2, posY_c2, width_c2, height_c2);
            }else{
                this.drawCell(doc, '--'+index, posX_c1, currentPosY, width_c1, height_c1);
                this.drawCell(doc, 'contenido', posX_c2, currentPosY, width_c2, height_c2);
                currentPosY += height_c1
            }
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
