import * as ExcelJS from 'exceljs';

import { Injectable } from '@nestjs/common';
import { Worksheet } from 'exceljs';

@Injectable()
export class ReportesService {

    getExcel(data:any):ExcelJS.Workbook{
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet 1');
        this.createExcelHeader(worksheet);
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
}
