import * as jwt from "jsonwebtoken"
import { CustomError } from "../error/CustomError";
import { AuthenticationData } from "../model/AuthenticationData";

export class Authenticator {
    generateToken = (input: AuthenticationData): string => {
        const token = jwt.sign(
            {
                id: input.id,
                role: input.role
            },
            process.env.JWT_KEY as string,
            { expiresIn: "1h" }
        )
        return token
    }

    getTokenData = (token: string): AuthenticationData => {
        try {
            const payload = jwt.verify(token, process.env.JWT_KEY as string) as jwt.JwtPayload

            const result = {
                id: payload.id,
                role: payload.role
            }

            return result
        } catch (error: any) {
            throw new CustomError(401, error.message)
        }

    }
}