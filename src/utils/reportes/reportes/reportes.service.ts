import * as ExcelJS from 'exceljs';
import * as moment from 'moment';

import { Injectable } from '@nestjs/common';
import { ReporteEntity } from 'src/ausentismo/entities/reporte.entity';
import { Worksheet } from 'exceljs';

@Injectable()
export class ReportesService {

    getExcel(data:ReporteEntity[]):ExcelJS.Workbook{
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet 1');
        this.createExcelHeader(worksheet);
       // this.addContenido(worksheet,data)
        return workbook;
    }



    private createExcelHeader(pagina:Worksheet){
        pagina.addRow(['Consecutivo', 'ConsecutivoPadre','Cod_Tipo_Documento','Nit_Empresa',
                        'Cod_Departamento','Cod_Municipio','Cod_Sede','Cod_Tipo_Documento',
                        'Num_Documento','Nombre_Trabajador','Edad','Sexo','Cod_Ocupación',
                        'Nombre_EPS','Tipo_Ocupación','I.B.C.','Cod_Contingencia','Cod_Proceso',
                        'Fecha_Inicio','Fecha_Fin','Cod_Diagnostico','Factor_Prestacional','Observacion'
                    ]);
    }

    private addContenido(pagina:Worksheet,data:ReporteEntity[]){
        const actualAnio = moment().year();
        data.forEach(item=>{
            const anioNacimiento = moment(item.fechaNacimiento).year()
            const edad = actualAnio - anioNacimiento;
            pagina.addRow([
                '','','preguntar a quien pertence','nit de quien??',item.codDepartamento,item.codMunicipio,
                item.sede,item.tipoDocumento,item.documento,item.nombre,item.apellido,edad,item.genero,
                item.codOcupacion,item.eps,item.tipoOcupacion,'preguntar que es?',item.codigoContingencia,
                item.codigoProceso,item.fechaInicio,item.fechaFin,(item.codigoDiagnostico)?item.codigoDiagnostico:'',
                (item.factorPrestacional)?item.factorPrestacional:'',(item.observacion)?item.observacion:''
            ]);
        })
    }
}
