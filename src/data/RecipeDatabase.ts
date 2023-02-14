import { RecipeRepository } from "../business/RecipeRepository";
import { CustomError } from "../error/CustomError";
import { recipe, recipeDB } from "../model/recipe";
import { BaseDatabase } from "./BaseDatabase";

export class RecipeDatabase extends BaseDatabase implements RecipeRepository {
  private static TABLE_NAME = "cookenu_recipes";

  async insertRecipe(recipe: recipe): Promise<void> {
    try {
      await RecipeDatabase.connection
        .insert(recipe)
        .into(RecipeDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }

  async findRecipeById(id: string): Promise<recipeDB> {
    try {
      const result = await RecipeDatabase.connection(RecipeDatabase.TABLE_NAME)
        .select().where({ id })

      return result[0]
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }
}
