export interface AusentismoDto{
    fechaInicio:Date;
    fechaFin:Date;
    horaInicio:Date;
    horaFin:Date;
    codigoContingencia:number;
    codigoProceso:number;
    codigoDiagostico?:string;
    documentoEmpleado:string;
    supervisorId:number;
}