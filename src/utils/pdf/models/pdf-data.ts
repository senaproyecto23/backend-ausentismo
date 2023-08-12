export interface PdfData {
    nombre:string;
    apellido:string;
    empleadoDocumento:string;
    empleadoCargo:number;
    fechaCreacion:Date;
    fechaInicio:Date;
    horaIncio:Date;
    horaFin:Date;
    fechaFin:Date;
    contingencia:number;
    diagnostico?:string;
    fechaAprobacion?;
    codigoProceso?;
}