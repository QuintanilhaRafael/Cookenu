import * as jwt from "jsonwebtoken"
import { CustomError } from "../error/CustomError";
import { AuthenticationData } from "../model/authenticationData";

export class Authenticator {
    public generateToken = (data: AuthenticationData): string => {
        const token = jwt.sign(
            { id: data.getId() },
            process.env.JWT_KEY as string,
            { expiresIn: "1h" }
        )
        return token;
    }

    getTokenData = (token: string): AuthenticationData => {
        try {
            const payload = jwt.verify(token, process.env.JWT_KEY as string) as AuthenticationData
            return payload;
        } catch (error: any) {
            throw new CustomError(401, error.message)
        }

    }
}