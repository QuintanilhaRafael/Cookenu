import { UserRepository } from "../business/UserRepository";
import { CustomError } from "../error/CustomError";
import { user } from "../model/user";
import { UserOutputDTO } from "../model/UserDTO";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase implements UserRepository {
  private static TABLE_NAME = "cookenu_users";

  async insertUser(user: user): Promise<void> {
    try {
      await UserDatabase.connection
        .insert(user)
        .into(UserDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }

  async findUserByEmail(email: string): Promise<user> {
    try {
      const result = await UserDatabase.connection(UserDatabase.TABLE_NAME)
        .select().where({ email })

      return result[0]
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }

  async findUserById(id: string): Promise<UserOutputDTO> {
    try {
      const result = await UserDatabase.connection(UserDatabase.TABLE_NAME)
        .select("id", "name", "email").where({ id })

      return result[0]
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await UserDatabase.connection(UserDatabase.TABLE_NAME)
        .delete()
        .where({ id })

    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }

  async updatePassword(password: string, email: string): Promise<void> {
    try {
      await UserDatabase.connection
        .update({ password })
        .where({ email })
        .into(UserDatabase.TABLE_NAME)
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }


}
