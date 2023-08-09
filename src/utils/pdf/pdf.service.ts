import * as PDFDocument from 'pdfkit';
import * as moment from 'moment';
import * as path from 'path';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PdfData } from './models/pdf-data';

@Injectable()
export class PdfService {

    async generate(data:PdfData):Promise<any>{

        try {
            const doc =  new PDFDocument({size:'LEGAL'});
            this.createTabla(doc);
            doc.fontSize(20)
            .text('SOLICITUD DE PERMISO',200,140)
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
        // Datos para la tabla
        const tableData = [
                        ['Nombre', 'Edad', 'Ciudad'],
                        ['Juan', '25', 'Madrid'],
                        ['María', '30', 'Barcelona'],
                        ['Carlos', '22', 'Valencia']
                    ];

        // Dibujar la tabla en el documento
        this.drawTable(doc,tableData, 50, 20);            
    }

    // Función para dibujar la tabla
    drawTable(doc,data, startX, startY) {

        // Configurar las propiedades de la tabla
        const tableWidth = 500;
        const tableHeight =  90;
        //doc.rect(startX, startY, tableWidth, tableHeight).stroke();
        this.createHeader(doc)
       /* for (const row of data) {
            this.drawCell(doc,row[0], startX, y, tableWidth / columnas, cellHeight);
            this.drawCell(doc,row[1], startX + tableWidth / columnas, y, tableWidth / columnas, cellHeight);
            //this.drawCell(doc,row[2], startX + (tableWidth / 3) * 2, y, tableWidth / 3, cellHeight);
            y += cellHeight;
        }*/
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
        this.drawCellWithImage(doc, 50, 20, width, height);
        this.drawCell(doc, 'encabezado', 150, 20, 400, 40);
        this.drawCell(doc, 'proceso', 150, 60, 180, 50);
        this.drawCell(doc, 'codigo', 330, 60, 120, 50);
        this.drawCell(doc, 'version', 450, 60, 100, 50);

    }

    createTableBody(doc){
          // Configurar las propiedades de la tabla
        const tableWidth = 500;
        const tableHeight =  650;
        doc.rect(50, 170, tableWidth, tableHeight).stroke();
        this.drawCell(doc, 'fecha solicitud', 50, 170, 500, 30);
        this.drawCell(doc, 'funcionario', 50, 200, 500, 30);
        this.drawCell(doc, 'cedula', 50, 230, 500, 30);
        this.drawCell(doc, 'cargo', 50, 260, 500, 30);
        this.drawCell(doc, 'dependecia', 50, 290, 500, 30);
        this.drawCell(doc, 'causal de solicitud', 50, 320, 500, 600);
        this.createCausalTable(doc)
    }

    createCausalTable(doc){
        const tableWidth = 480;
        const tableHeight =  600;
        doc.rect(59, 350, tableWidth, tableHeight).stroke();
        this.drawCell(doc, '--1', 59, 350, 250, 40);
        this.drawCell(doc, 'contenido', 309, 350, 230, 40);
        this.drawCell(doc, '--2', 59, 390, 250, 40);
        this.drawCell(doc, 'contenido', 309, 390, 230, 40);
        this.drawCell(doc, '--3', 59, 430, 250, 40);
        this.drawCell(doc, 'contenido', 309, 430, 230, 40);
        this.drawCell(doc, '--4', 59, 470, 250, 40);
        this.drawCell(doc, 'contenido', 309, 470, 230, 40);
        this.drawCell(doc, '--5', 59, 510, 250, 40);
        this.drawCell(doc, 'contenido', 309, 510, 230, 40);
        this.drawCell(doc, '--6', 59, 550, 250, 40);
        this.drawCell(doc, 'contenido', 309, 550, 230, 40); 
        this.drawCell(doc, '--7', 59, 590, 250, 40);
        this.drawCell(doc, 'contenido', 309, 590, 230, 40);
        this.drawCell(doc, '--8', 59, 630, 250, 40);
        this.drawCell(doc, 'contenido', 309, 630, 230, 40);
        this.drawCell(doc, '--9 compensatorio', 59, 670, 480, 120);
        this.drawCell(doc, '--9.1', 70, 700, 230, 40);
        this.drawCell(doc, '--9.2', 300, 700, 230, 40);
        this.drawCell(doc, '--9.3', 70, 740, 230, 40);
        this.drawCell(doc, '--9.4', 300, 740, 230, 40);
        this.drawCell(doc, 'Otro', 59, 780, 250, 20);
        this.drawCell(doc, 'cual?', 309, 780, 230, 20);
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
