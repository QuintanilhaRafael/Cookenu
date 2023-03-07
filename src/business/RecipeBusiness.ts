import { CustomError } from "../error/CustomError"
import { DifferentRecipeCreator, InvalidDescription, InvalidTitle, RecipeNotFound } from "../error/RecipeErros"
import { Unauthorized } from "../error/UserErrors"
import { editRecipeInput, recipe } from "../model/recipe"
import { EditRecipeInputDTO, RecipeInputDTO, RecipeOutputDTO } from "../model/RecipeDTO"
import { UserRole } from "../model/user"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"
import { RecipeRepository } from "./RecipeRepository"
import { UserRepository } from "./UserRepository"

const authenticator = new Authenticator()
const idGenerator = new IdGenerator()

export class RecipeBusiness {

  constructor(
    private recipeDatabase: RecipeRepository,
    private userDatabase: UserRepository
  ) { }

  async createRecipe(input: RecipeInputDTO): Promise<void> {
    try {
      const { title, description, token } = input

      if (!title || !description || !token) {
        throw new CustomError(422, "title, description and token must be provided.")
      }

      if (title.length < 3) {
        throw new InvalidTitle()
      }

      if (description.length < 5) {
        throw new InvalidDescription()
      }

      const userId = authenticator.getTokenData(token).id

      const user = await this.userDatabase.findUserById(userId)

      const id = idGenerator.generateId()

      const recipe: recipe = {
        id,
        title,
        description,
        userId,
        userName: user.name
      }

      await this.recipeDatabase.insertRecipe(recipe)

    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }

  async getRecipe(token: string, id: string): Promise<RecipeOutputDTO> {
    try {
      if (!id || !token) {
        throw new CustomError(422, "id and token must be provided.")
      }

      authenticator.getTokenData(token)

      const recipeDB = await this.recipeDatabase.findRecipeById(id)

      if (!recipeDB) {
        throw new RecipeNotFound()
      }

      const recipe: RecipeOutputDTO = {
        id: recipeDB.id,
        title: recipeDB.title,
        description: recipeDB.description,
        createdAt: recipeDB.created_at,
        userId: recipeDB.user_id,
        userName: recipeDB.user_name
      }

      return recipe
    } catch (error: any) {
      throw new CustomError(400, error.message)
    }
  }

  public editRecipe = async (input: EditRecipeInputDTO) => {
    try {
      const { id, title, description, token } = input;

      if (!id || !title || !description || !token) {
        throw new CustomError(422, 'id, title, description and token must be provided.')
      }

      if (title.length < 3) {
        throw new InvalidTitle()
      }

      if (description.length < 5) {
        throw new InvalidDescription()
      }

      const authenticationData = authenticator.getTokenData(token)

      if (authenticationData.role !== UserRole.NORMAL) {
        throw new Unauthorized()
      }

      const recipe = await this.recipeDatabase.findRecipeById(id)

      if (recipe.user_id !== authenticationData.id) {
        throw new DifferentRecipeCreator()
      }

      const editRecipeInput: editRecipeInput = {
        id,
        title,
        description,
      };

      await this.recipeDatabase.updateRecipe(editRecipeInput)
    } catch (error: any) {
      throw new CustomError(400, error.message)
    }
  }

  async deleteRecipe(token: string, id: string): Promise<void> {
    try {
      if (!token || !id) {
        throw new CustomError(422, "token and id must be provided.")
      }

      const authenticationData = authenticator.getTokenData(token)

      const recipe = await this.recipeDatabase.findRecipeById(id)

      if (authenticationData.role === UserRole.NORMAL) {
        if (recipe.user_id !== authenticationData.id) {
          throw new DifferentRecipeCreator()
        }
        await this.recipeDatabase.deleteRecipe(id)
      }            

      if (authenticationData.role === UserRole.ADMIN) {
        await this.recipeDatabase.deleteRecipe(id)
      }      

    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }
}
