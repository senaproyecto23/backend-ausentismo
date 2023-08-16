import * as PDFDocument from 'pdfkit';
import * as moment from 'moment';
import * as path from 'path';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { ContingenciaEntity } from 'src/listas/entities/contingencia.entity';
import { ContingenciaService } from 'src/listas/services/contingencia/contingencia.service';
import { DiagnosticoService } from 'src/listas/services/diagnostico/diagnostico.service';
import { OcupacionService } from 'src/listas/services/ocupacion/ocupacion.service';
import { PdfData } from './models/pdf-data';
import { ProcesosService } from 'src/listas/services/procesos/procesos.service';

interface CeldaConfig{
    doc:any;
    posX:number;
    posY:number;
    cellPadding?:number;
    align?:string;
    width?:number;
    height?:number;
    text:string;
    font?:string;
    fontSize?:number;

}

@Injectable() 
export class PdfService {



    constructor(private ocupacionService:OcupacionService,
        private contingenciaService:ContingenciaService,
        private diagnosticoService:DiagnosticoService,
        private procesoService:ProcesosService){}

    async generate(data:PdfData):Promise<any>{

        try {
            const doc =  new PDFDocument({size:'TABLOID'});
            await this.createHeader(doc,data);
            doc.fontSize(20)
            .text('SOLICITUD DE PERMISO',300,140)
            await this.createTableInfoBasica(doc,data);
            await this.createCausalTable(doc,data);
            this.createFechaAusentismo(doc,data)
            await this.createObservaciones(doc,data);
            this.createFirmas(doc,data)
            return doc;
        } catch (error) {
            console.log({error})
            throw new HttpException('Ocurrió un error intenta más tarde', HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
 
    async createHeader(doc,data:PdfData){
        const width =100;
        const height = 90;
        const cellPadding = 10;
        const fontSize = 12;
       
        let celdaConfig:CeldaConfig = {
            doc:doc,
            text: 'REGISTRO SOLICITUD DE PERMISO',
            posX:250,
            posY:20,
            width:400,
            height:40,
            fontSize:fontSize,
            cellPadding:cellPadding,
            font:'Helvetica-Bold',
            align:'center'
        }

        this.drawCellWithImage(doc, 150, 20, width, height);

        this.drawCell( celdaConfig);
        celdaConfig.text = `Proceso:\n ${await this.getNombreProceso(data.codigoProceso)}`;
        celdaConfig.posX = 250;
        celdaConfig.posY = 60;
        celdaConfig.width = 180;
        celdaConfig.height = 50;
        celdaConfig.align = 'left';
        this.drawCell(celdaConfig);
        celdaConfig.text = 'Código: RGC-09';
        celdaConfig.posX = 430;
        celdaConfig.posY = 60;
        celdaConfig.width = 120;
        celdaConfig.height = 50;
        celdaConfig.align = 'left';
        this.drawCell(celdaConfig);
        celdaConfig.text = 'Versión: 01';
        celdaConfig.posX = 550;
        celdaConfig.posY = 60;
        celdaConfig.width = 100;
        celdaConfig.height = 50;
        celdaConfig.align = 'left';
        this.drawCell(celdaConfig);

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
 
    drawCell( config:CeldaConfig) {
        config.doc.rect(config.posX, config.posY, config.width, config.height).stroke();
        config.doc.fontSize(config.fontSize)
        .font(config.font)
        .text(config.text, config.posX + config.cellPadding, config.posY + config.cellPadding, { width: config.width - config.cellPadding * 2,align:config.align });
    }

    
    async createTableInfoBasica(doc,data:PdfData){
          // Configurar las propiedades de la tabla
        const width_c1 = 500;
        const height_c1 =  30;
        const posX_c1 = 150;
        const posY_c1 = 170
        const cellPadding = 10;
        const fontSize = 12;
        let celdaConfig:CeldaConfig = {
            doc:doc,
            text: `Fecha de la solicitud:  ${this.parseDate(data.fechaCreacion)}`,
            posX:posX_c1,
            posY:posY_c1,
            width:width_c1,
            height:height_c1,
            fontSize:fontSize,
            cellPadding:cellPadding,
            font:'Helvetica-Bold',
            align:'left'
        }
        this.drawCell(celdaConfig);
        celdaConfig.text = `Funcionario: ${data.nombre} ${data.apellido}`;
        celdaConfig.posY =200;
        this.drawCell(celdaConfig);
        celdaConfig.text = `cedula: ${data.empleadoDocumento}`
        celdaConfig.posY =230;
        this.drawCell(celdaConfig);
        celdaConfig.text =`cargo: ${ await this.getNombreOcupacion(data.empleadoCargo) } `
        celdaConfig.posY =260;
        this.drawCell(celdaConfig);
        celdaConfig.text = `Dependecia: `
        celdaConfig.posY =290;
        this.drawCell( celdaConfig);
    }



    async createCausalTable(doc,data:PdfData){
        const width_c1 = 400;
        const height_c1 =  30;
        const posX_c1 = 159;
        const posY_c1 = 350

        const posX_c1_titulo = 150;
        const width_c1_titulo = 500;
        ///////////////////////
        const posX_c2 = 560;
        const posY_c2 = 350;
        const width_c2 = 79;
        const height_c2 =  30;
        //////////////////////
        const cellPadding = 10;
        const fontSize = 12;
        let currentPosY = (posY_c1 + height_c1);

        let celdaConfig:CeldaConfig = {
            doc:doc,
            text: 'Causal de solicitud',
            posX:posX_c1_titulo,
            posY:320,
            width:width_c1_titulo,
            height:485,
            fontSize:fontSize,
            cellPadding:cellPadding,
            font:'Helvetica-Bold',
            align:'left'
        }

        this.drawCell(celdaConfig);
        const causales:ContingenciaEntity[] = await this.contingenciaService.getAll();
        
         
        causales.forEach((item,index)=>{
            if(index == 1){
                celdaConfig.text = `${item.descripcion}`;
                celdaConfig.posX = posX_c1;
                celdaConfig.posY = posY_c1;
                celdaConfig.width=width_c1;
                celdaConfig.height = height_c1;
                celdaConfig.font = 'Helvetica';
                celdaConfig.align = `${(item.codigo === data.contingencia)?'center':'left'}`
                this.drawCell(celdaConfig);

                celdaConfig.text =  `${(item.codigo === data.contingencia)?'X':''}`;
                celdaConfig.posX = posX_c2;
                celdaConfig.posY = posY_c2;
                celdaConfig.width=width_c2;
                celdaConfig.height = height_c2;
                celdaConfig.font = 'Helvetica';
                celdaConfig.align = `${(item.codigo === data.contingencia)?'center':'left'}`
                this.drawCell( celdaConfig);
            }else{
                celdaConfig.text =   `${item.descripcion}`;
                celdaConfig.posX = posX_c1;
                celdaConfig.posY = currentPosY;
                celdaConfig.width=width_c1;
                celdaConfig.height = height_c1;
                
                this.drawCell(celdaConfig);

                celdaConfig.text = `${(item.codigo === data.contingencia)?'X':''}`;
                celdaConfig.posX = posX_c2;
                celdaConfig.posY = currentPosY;
                celdaConfig.width=width_c2;
                celdaConfig.height = height_c2;
                celdaConfig.font = 'Helvetica';
                celdaConfig.align = `${(item.codigo === data.contingencia)?'center':'left'}`
                this.drawCell( celdaConfig);
                currentPosY += height_c1
            }
        })
    }

    
    createFechaAusentismo(doc,data:PdfData){
        const width_c1 = 240;
        const height_c1 =  25;
        const posX_c1 = 159;
        const posY_c1 = 830
        ///////////////////////
        const posX_c2 = 400;
        const width_c2 = 240;
        const height_c2 =  25;
         // Configurar las propiedades de la tabla
         const cellPadding = 10;
         const fontSize = 12;
         const posX_c1_titulo = 150;
         const width_c1_titulo = 500;


         let celdaConfig:CeldaConfig = {
            doc:doc,
            text: `Fecha del permiso, estímulo o compensatorio:${this.parseDate(data.fechaInicio)}`,
            posX:posX_c1_titulo,
            posY:805,
            width:width_c1_titulo,
            height:110,
            fontSize:fontSize,
            cellPadding:cellPadding,
            font:'Helvetica',
            align:'left'
        }

        this.drawCell( celdaConfig);
        let currentPosY = (posY_c1 + height_c1);
    
        for (let index = 1; index <=3; index++) {
            if(index == 1){
                celdaConfig.text = `Número de días (${this.isDays(data)})`;
                celdaConfig.posX = posX_c1;
                celdaConfig.posY = posY_c1;
                celdaConfig.width=width_c1;
                celdaConfig.height = height_c1;
                this.drawCell( celdaConfig);
                
                celdaConfig.text = `Permiso de horas (${this.isHours(data)})`;
                celdaConfig.posX = posX_c2;
                celdaConfig.posY = posY_c1;
                celdaConfig.width=width_c2;
                celdaConfig.height = height_c2;
                this.drawCell(celdaConfig );
            }
            
            if(index == 2){
                celdaConfig.text = `Desde :${ (this.isDays(data) == 0)? '': this.parseDate(data.fechaInicio)}`;
                celdaConfig.posX = posX_c1;
                celdaConfig.posY = currentPosY;
                celdaConfig.width=width_c1;
                celdaConfig.height = height_c1;
                this.drawCell( celdaConfig);

                celdaConfig.text =`Desde :${ (this.isHours(data) == 0)? '': this.parseDate(data.fechaInicio)}`;
                celdaConfig.posX = posX_c2;
                celdaConfig.posY = currentPosY;
                celdaConfig.width=width_c2;
                celdaConfig.height = height_c2;
                this.drawCell( celdaConfig);
                currentPosY += height_c1
            }

            if(index == 3){
                celdaConfig.text = `Hasta :${ (this.isDays(data) == 0)? '': this.parseDate(data.fechaFin)}`;
                celdaConfig.posX = posX_c1;
                celdaConfig.posY = currentPosY;
                celdaConfig.width=width_c1;
                celdaConfig.height = height_c1;
                this.drawCell( celdaConfig);

                celdaConfig.text =`Hasta :${ (this.isHours(data) == 0)? '': this.parseDate(data.fechaFin)}`;
                celdaConfig.posX = posX_c2;
                celdaConfig.posY = currentPosY;
                celdaConfig.width=width_c2;
                celdaConfig.height = height_c2;
                this.drawCell(celdaConfig);
                currentPosY += height_c1
            }
        }
      
    }


    async createObservaciones(doc, data:PdfData){
        const width_c1 = 500;
        const posX_c1 = 150;
        const cellPadding = 10;
        const fontSize = 12;

        let celdaConfig:CeldaConfig = {
            doc:doc,
            text:'Observaciones:',
            posX:posX_c1,
            posY:915,
            width:width_c1,
            height:70,
            fontSize:fontSize,
            cellPadding:cellPadding,
            font:'Helvetica',
            align:'left'
        }

        this.drawCell(celdaConfig);
        if(data.diagnostico){
            const diagnostico = await this.getNombreDiagnostico(data.diagnostico)
            doc.fontSize(fontSize).text(`${diagnostico}`, posX_c1 + cellPadding, 940 + cellPadding);
        }
        
    }

    isDays(data:PdfData):number{
        const cantidadDias = this.getDays(data.fechaInicio,data.fechaFin);
        return (cantidadDias == 0)? 0 :cantidadDias;
    }

    
    isHours(data:PdfData):number{
        const cantidadHoras = this.getHoras(data.horaIncio.toString(),data.horaFin.toString())
        return (cantidadHoras == 0)? 0:cantidadHoras;
    }

    createFirmas(doc,data:PdfData){
        const posX_c1 = 150;
        const cantidadDias = this.isDays(data);
        doc.text('____________________________',posX_c1,1050)
        doc.text('Funcionario',posX_c1,1065)
        doc.text('____________________________',posX_c1+300,1050)
        doc.text('Superior Inmediato',posX_c1+300,1065);
        console.log(cantidadDias)
        if(cantidadDias > 1 && cantidadDias <= 3){
            doc.text('______________________________',posX_c1,1120)
            doc.text('Secretaria Administrativa y Financiera',posX_c1,1135)
        }

        if( cantidadDias > 3){
            doc.text('______________________________',posX_c1,1120)
            doc.text('Secretaria Administrativa y Financiera',posX_c1,1135)
            doc.text('______________________________',posX_c1+300,1120)
            doc.text('Contralor Departamental',posX_c1+300,1135)
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
        const unaHora = (1/60);
        const h1 = moment(hora1,'HH:mm')
        const h2 = moment(hora2,'HH:mm')
        return h2.diff(h1, 'm')  * unaHora
     }

    parseDate(fecha1:Date):string{
        return fecha1.toLocaleDateString('es-CO',{weekday:"long", year:"numeric", month:"long", day:"numeric"});
    }

    async getNombreOcupacion(code:number){
        const ocupacion = await this.ocupacionService.getByCode(code);
        return  ocupacion.descripcion;
    }

    async getNombreDiagnostico(codigo:string){
        const diagnostico = await this.diagnosticoService.getByCode(codigo);
        return diagnostico.descripcion;
    }

    async getNombreProceso(codigo:number){
        const proceso = await this.procesoService.getByCode(codigo);
        return proceso.descripcion;
    }
}
