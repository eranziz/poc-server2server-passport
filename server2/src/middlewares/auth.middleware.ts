import {Response} from "express";
import {config} from "../../../shared/config";
import * as httpStatus from "http-status";

export function authenticationMiddleware(request: any, response: Response, next: any) {
    const authorization: any = request.headers.authorization;
    const token: string = authorization.substring(6);
    console.log(token);
    if(token !== config.server2serverToken){
        response.sendStatus(httpStatus.FORBIDDEN);
    }
    next();
}
