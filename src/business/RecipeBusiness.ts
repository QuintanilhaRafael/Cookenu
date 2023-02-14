import { CustomError } from "../error/CustomError"
import { InvalidDescription, InvalidTitle, RecipeNotFound } from "../error/RecipeErros"
import { recipe, recipeDB } from "../model/recipe"
import { RecipeInputDTO, RecipeOutputDTO } from "../model/RecipeDTO"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"
import { RecipeRepository } from "./RecipeRepository"

const authenticator = new Authenticator()
const idGenerator = new IdGenerator()

export class RecipeBusiness {

  constructor(private recipeDatabase: RecipeRepository) { }

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

      authenticator.getTokenData(token)

      const id = idGenerator.generateId()

      const recipe: recipe = {
        id,
        title,
        description
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
        createdAt: recipeDB.created_at
      }

      return recipe
    } catch (error: any) {
      throw new CustomError(400, error.message)
    }
  }
}
