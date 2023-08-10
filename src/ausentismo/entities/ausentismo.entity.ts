import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'ausentismo'})
export class AusentismoEntity{

    @PrimaryGeneratedColumn()
    id?:number;

    @Column({name:'fecha_inicio'})
    fechaInicio:Date;

    @Column({name:'fecha_fin'})
    fechaFin:Date;

    @Column('time',{name:'hora_inicio'})
    horaInicio?:Date;

    @Column('time',{name:'hora_fin'})
    horaFin?:Date;

    @Column({name:'empleado_documento'})
    empleadoDocumento:string;

    @Column({name:'estado'})
    estado:string;

    @Column({name:'activo'})
    activo:boolean;

    @Column({name:'observacion'})
    observacion?:string;

    @Column({name:'fecha_creacion'})
    fechaCreacion?:Date;

    @Column({name:'fecha_aprobacion'})
    fechaAprobacion?:Date;

    @Column({name:'cod_contingencia'})
    codigoContingencia:number;

    @Column({name:'cod_proceso'})
    codigoProceso:number;

    @Column({name:'cod_diagnostico'})
    codigoDiagostico?:string;

    @Column({name:'supervisor_id'})
    supervisorId:number;

}