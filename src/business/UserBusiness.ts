import { CustomError } from "../error/CustomError"
import { InvalidEmail, InvalidName, InvalidPassword, Unauthorized, UserNotFound } from "../error/UserErrors"
import { Authenticator } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { user } from "../model/user"
import { IdGenerator } from "../services/IdGenerator"
import { LoginInputDTO, UserInputDTO, UserOutputDTO } from "../model/UserDTO"
import { UserRepository } from "./UserRepository"

const authenticator = new Authenticator()
const hashManager = new HashManager()
const idGenerator = new IdGenerator()

export class UserBusiness {

  constructor(private userDatabase: UserRepository) { }

  async signup(input: UserInputDTO): Promise<string> {
    try {
      const { name, email, password } = input

      if (!email || !name || !password) {
        throw new CustomError(422, "name, email and password must be provided.")
      }

      if (!email.includes("@")) {
        throw new InvalidEmail()
      }

      if (name.length < 3) {
        throw new InvalidName()
      }

      if (password.length < 6) {
        throw new InvalidPassword()
      }

      const id = idGenerator.generateId()

      const hashPassword: string = await hashManager.generateHash(password)

      const user: user = {
        id,
        name,
        email,
        password: hashPassword
      }

      await this.userDatabase.insertUser(user)

      const token = authenticator.generateToken({ id })

      return token
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }

  async login(input: LoginInputDTO): Promise<string> {
    try {
      const { email, password } = input;

      if (!email || !password) {
        throw new CustomError(400, "email and password must be provided."
        );
      }

      if (!email.includes("@")) {
        throw new InvalidEmail();
      }

      const user = await this.userDatabase.findUserByEmail(email)

      if (!user) {
        throw new UserNotFound()
      }

      const compareResult: boolean = await hashManager.compareHash(password, user.password)

      if (!compareResult) {
        throw new InvalidPassword()
      }

      const token = authenticator.generateToken({ id: user.id })

      return token
    } catch (error: any) {
      throw new CustomError(400, error.message)
    }
  }

  async getProfile(token: string): Promise<UserOutputDTO> {
    try {
      if (!token) {
        throw new CustomError(422, "token must be provided.")
      }

      const userId = authenticator.getTokenData(token).id

      const user = await this.userDatabase.findUserById(userId)

      if (!user) {
        throw new UserNotFound()
      }

      return user
    } catch (error: any) {
      throw new CustomError(400, error.message)
    }
  }

  async getUser(token: string, id: string): Promise<UserOutputDTO> {
    try {
      if (!id || !token) {
        throw new CustomError(422, "id and token must be provided.")
      }

      authenticator.getTokenData(token)

      const user = await this.userDatabase.findUserById(id)

      if (!user) {
        throw new UserNotFound()
      }

      return user
    } catch (error: any) {
      throw new CustomError(400, error.message)
    }
  }

}
