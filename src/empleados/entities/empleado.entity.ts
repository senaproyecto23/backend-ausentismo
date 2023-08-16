import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'empleados'})
export class EmpleadoEntity{

    @PrimaryGeneratedColumn()
    id?:number;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column({name:'fk_tipo_documento'})
    tipoDocumento:number;

    @Column()
    documento:string;

    @Column()
    genero:number;

    @Column({name:'fecha_nacimiento'})
    fechaNacimiento:Date;

    @Column()
    telefono:string;

    @Column({name:'tipo_ocupacion'})
    tipoOcupacion:string;

    @Column({name:'cod_ocupacion'})
    codigoOcupacion:number;

    @Column({name:'nombre_eps'})
    eps:string;

    @Column({name:'cod_departamento'})
    codigoDepartamento:number;

    @Column({name:'cod_municipio'})
    codigoMunicipio:number;

    @Column({name:'code_sede'})
    codigoSede:number;

    @Column({name:'factor_prestacional'})
    factorPrestacional?:number;

    @Column({name:'usuario_id'})
    usuarioId:number;

    @Column({name:'tipo_documento_empresa'})
    tipoDocumentoEmpresa?:number;


    @Column({name:'nit_empresa'})
    nitEmpresa?:string;

    @Column({name:'nombre_empresa'})
    nombreEmpresa?:string;

    @Column({name:'IBC'})
    ibc?:number;
}