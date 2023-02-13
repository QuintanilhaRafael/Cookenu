import * as jwt from "jsonwebtoken"
import { CustomError } from "../error/CustomError";
import { AuthenticationData } from "../model/AuthenticationData";

export class Authenticator {
    public generateToken = (authenticationData: AuthenticationData): string => {
        const token = jwt.sign(
            { id: authenticationData.getId() },
            process.env.JWT_KEY as string,
            { expiresIn: "1h" }
        )
        return token;
    }

    getTokenData = (token: string): any => {
        try {
            const payload = jwt.verify(token, process.env.JWT_KEY as string) as any
            return payload;
        } catch (error: any) {
            throw new CustomError(401, error.message)
        }

    }
}