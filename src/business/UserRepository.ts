import { User } from "../model/User";

export interface UserRepository {
    insert(user: User): Promise<void>
    findUserByEmail(email: string): Promise<any>
}