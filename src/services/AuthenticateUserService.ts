import { getCustomRepository } from "typeorm"

import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { UsersRepositories } from "../repositories /UsersRepositories"


interface IAuthenticateRequest{
    email: string;
    password: string;

}

class AuthenticateUserService{
 
    async execute({email, password}: IAuthenticateRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories);

        //Verificar se email existe
        const user = await usersRepositories.findOne({
            email
        })

        if(!user){
            throw new Error("Email/Password incorrect")
        }

        //Verificar se senha esta correta
        const passwordMatch = await compare(password, user.password)
        
        if (!passwordMatch){
            throw new Error("Email/Password incorrect")
        }


        // Gerar Token
        const token = sign({
            email: user.email
        }, "00b80c50aec1ef036b6f1d6b2fe48181", {
            subject: user.id,
            expiresIn: "1d",
        });

        return token;
    }

}


export { AuthenticateUserService }