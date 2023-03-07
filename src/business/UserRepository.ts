import { user } from "../model/user";
import { UserOutputDTO } from "../model/UserDTO";

export interface UserRepository {
    insertUser(user: user): Promise<void>
    findUserByEmail(email: string): Promise<user>
    findUserById(id: string): Promise<UserOutputDTO>
    deleteUser(userId: string): Promise<void>
    updatePassword(password: string, email: string): Promise<void>
}