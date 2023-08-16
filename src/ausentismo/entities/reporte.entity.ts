import * as moment from 'moment';

import { ViewColumn, ViewEntity } from "typeorm"

@ViewEntity({
    name:'reporte',
    expression: `
        SELECT  a.fecha_inicio ,
        a.fecha_fin ,
        a.fecha_creacion ,
        a.estado ,
        a.cod_contingencia ,
        a.cod_proceso ,
        a.cod_diagnostico ,
        a.observacion ,
        e.nombre ,
        e.apellido ,
        e.fk_tipo_documento ,
        e.fecha_nacimiento,
        e.genero ,
        e.documento ,
        e.tipo_ocupacion ,
        e.cod_ocupacion ,
        e.nombre_eps ,
        e.cod_departamento ,
        e.cod_municipio ,
        e.code_sede ,
        e.factor_prestacional 
        from ausentismo a 
        join empleados e on e.documento = a.empleado_documento ;
    `,
})
export class ReporteEntity{

    @ViewColumn({name:'fecha_inicio'})
    fechaInicio: Date;

    @ViewColumn({name:'fecha_fin'})
    fechaFin: Date;

    @ViewColumn({name:'fecha_creacion'})
    fechaCreacion: Date;

    @ViewColumn({name:'estado'})
    estado: string;

    @ViewColumn({name:'cod_contingencia'})
    codigoContingencia: number;

    @ViewColumn({name:'cod_proceso'})
    codigoProceso: number;

    @ViewColumn({name:'cod_diagnostico'})
    codigoDiagnostico?:string;

    @ViewColumn({name:'observacion'})
    observacion?:string;

    @ViewColumn({name:'nombre'})
    nombre:string;

    @ViewColumn({name:'apellido'})
    apellido:string;

    @ViewColumn({name:'fecha_nacimiento'})
    fechaNacimiento:Date;

    @ViewColumn({name:'genero'})
    genero:string;

    @ViewColumn({name:'fk_tipo_documento'})
    tipoDocumento:number;

    @ViewColumn({name:'documento'})
    documento:string;

    @ViewColumn({name:'tipo_ocupacion'})
    tipoOcupacion:string;

    @ViewColumn({name:'cod_ocupacion'})
    codOcupacion:number;

    @ViewColumn({name:'nombre_eps'})
    eps:string;

    @ViewColumn({name:'cod_departamento'})
    codDepartamento:number;

    @ViewColumn({name:'cod_municipio'})
    codMunicipio:number;

    @ViewColumn({name:'code_sede'})
    sede:number;

    @ViewColumn({name:'factor_prestacional'})
    factorPrestacional?:number;


    @ViewColumn({name:'tipo_documento_empresa'})
    tipoDocumentoEmpresa:number;

    @ViewColumn({name:'nit_empresa'})
    nitEmpresa:string;

    @ViewColumn({name:'IBC'})
    IBC?:number;
}