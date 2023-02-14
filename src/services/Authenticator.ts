import * as jwt from "jsonwebtoken"
import { CustomError } from "../error/CustomError";
import { authenticationData } from "../model/authenticationData";

export class Authenticator {
    public generateToken = ({ id }: authenticationData): string => {
        const token = jwt.sign(
            { id },
            process.env.JWT_KEY as string,
            { expiresIn: "1h" }
        )
        return token;
    }

    getTokenData = (token: string): authenticationData => {
        try {
            const payload = jwt.verify(token, process.env.JWT_KEY as string) as authenticationData
            return payload;
        } catch (error: any) {
            throw new CustomError(401, error.message)
        }

    }
}