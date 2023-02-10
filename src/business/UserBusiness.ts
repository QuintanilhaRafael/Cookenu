import { CustomError } from "../error/CustomError"
import { InvalidEmail, InvalidName, InvalidPassword, UserNotFound } from "../error/UserErrors"
import { Authenticator } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { User } from "../model/User"
import { IdGenerator } from "../services/IdGenerator"
import { LoginInputDTO, UserInputDTO } from "../model/UserDTO"
import { UserRepository } from "./UserRepository"
import { AuthenticationData } from "../model/authenticationData"

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

      const user = new User(
        id,
        name,
        email,
        hashPassword
      )

      await this.userDatabase.insert(user)

      const data = new AuthenticationData(id)

      const token = authenticator.generateToken(data)

      return token;
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

      const newUser = new User(
        user.id,
        user.name,
        user.email,
        user.password
      )

      const compareResult: boolean = await hashManager.compareHash(password, newUser.getPassword())

      if (!compareResult) {
        throw new InvalidPassword()
      }

      const data = new AuthenticationData(newUser.getId())

      const token = authenticator.generateToken(data)

      return token;
    } catch (error: any) {
      throw new CustomError(400, error.message)
    }
  };


}
