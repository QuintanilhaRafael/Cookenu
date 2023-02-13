import { User } from "../model/User";
import { UserOutputDTO } from "../model/UserDTO";

export interface UserRepository {
    insert(user: User): Promise<void>
    findUserByEmail(email: string): Promise<any>
    findUserById(id: string): Promise<UserOutputDTO>
}