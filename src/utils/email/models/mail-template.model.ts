export interface MailTemplate<T>{
    id:number
    to:string;
    params: T;
}