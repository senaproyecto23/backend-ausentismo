import { Request } from "express";

export class RequestUtil {


    static getAutorizationHeader(request: Request): string | undefined{
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}