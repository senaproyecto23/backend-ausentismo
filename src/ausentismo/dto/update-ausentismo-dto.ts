import { Estados } from "../models/estados.enum";

export interface UpdateAusentismoDTO{
    id:number;
    estado:Estados;
    observacion?:string;
}