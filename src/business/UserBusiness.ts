import { CustomError } from "../error/CustomError"
import { InvalidEmail, InvalidName, InvalidPassword, InvalidRole, Unauthorized, UserNotFound } from "../error/UserErrors"
import { Authenticator } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { user, UserRole } from "../model/user"
import { IdGenerator } from "../services/IdGenerator"
import { LoginInputDTO, UserInputDTO, UserOutputDTO } from "../model/UserDTO"
import { UserRepository } from "./UserRepository"
import { FollowRepository } from "./FollowRepository"
import { RecipeRepository } from "./RecipeRepository"
import { RecipeOutputDTO } from "../model/RecipeDTO"

const authenticator = new Authenticator()
const hashManager = new HashManager()
const idGenerator = new IdGenerator()

export class UserBusiness {

  constructor(
    private userDatabase: UserRepository,
    private followDatabase: FollowRepository,
    private recipeDatabase: RecipeRepository
  ) { }

  async signup(input: UserInputDTO): Promise<string> {
    try {
      const { name, email, password, role } = input

      if (!email || !name || !password || !role) {
        throw new CustomError(422, "name, email, password and role must be provided.")
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

      if (role.toLowerCase() !== UserRole.ADMIN && role.toLowerCase() !== UserRole.NORMAL) {
        throw new InvalidRole()
      }

      const id = idGenerator.generateId()

      const hashPassword: string = await hashManager.generateHash(password)

      const user: user = {
        id,
        name,
        email,
        password: hashPassword,
        role: role.toLowerCase()
      }

      await this.userDatabase.insertUser(user)

      const token = authenticator.generateToken({ id: user.id, role: user.role })

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

      const token = authenticator.generateToken({ id: user.id, role: user.role })

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

  async getRecipesFeed(token: string): Promise<RecipeOutputDTO[]> {
    try {

      const getFollows = await this.followDatabase.selectFollows()

      const userId = authenticator.getTokenData(token).id

      const filterFollows = getFollows.filter(follow => {
        return follow.user_id === userId
      })

      let followsIds: string[] = [];
      filterFollows?.forEach(follow => {
        followsIds.push(follow.user_to_follow_id)
      })

      if (followsIds.length === 0) {
        throw new CustomError(404, "The user is not following anyone.")
      }

      let feed: RecipeOutputDTO[] = [];
      for (let followId of followsIds) {
        const recipes = await this.recipeDatabase.selectFeed(followId)
        recipes.forEach(recipe => {
          feed.push({
            id: recipe.id,
            title: recipe.title,
            description: recipe.description,
            createdAt: recipe.created_at,
            userId: recipe.user_id,
            userName: recipe.user_name
          })
        })
      }

      return feed
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }

  async deleteUser(token: string, id: string): Promise<void> {
    try {
      if (!token || !id) {
        throw new CustomError(422, "token and id must be provided.")
      }
      
      const user = await this.userDatabase.findUserById(id)

      if (!user) {
        throw new UserNotFound()
      }

      const authenticationData = authenticator.getTokenData(token)

      if (authenticationData.role !== UserRole.ADMIN) {
        throw new Unauthorized()
      }      

      await this.followDatabase.deleteUserFollows(id)

      await this.recipeDatabase.deleteUserRecipes(id)

      await this.userDatabase.deleteUser(id)      
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }

}
