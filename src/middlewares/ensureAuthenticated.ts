import { Request, Response, NextFunction} from "express"
import { verify } from "jsonwebtoken";

interface IPayload {
    sub : string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){

    //Receber o token
    const authtoken = request.headers.authorization;

    //Validar se token esta preenchido

    if(!authtoken){
        return response.status(401).end();
    }

    const [, token] = authtoken.split(" ");

    try{ 
        //validar se token é valido 
       const { sub } = verify(token ,"00b80c50aec1ef036b6f1d6b2fe48181") as IPayload;


      //Recuperar informações do usuario
       request.user_id = sub

        return next();
    }catch(err){
        return response.status(401).end();
    }
    

    

    
}
