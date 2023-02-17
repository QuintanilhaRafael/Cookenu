import { RecipeRepository } from "../business/RecipeRepository";
import { CustomError } from "../error/CustomError";
import { editRecipeInput, recipe, recipeDB } from "../model/recipe";
import { BaseDatabase } from "./BaseDatabase";

export class RecipeDatabase extends BaseDatabase implements RecipeRepository {
  private static TABLE_NAME = "cookenu_recipes";

  async insertRecipe(recipe: recipe): Promise<void> {
    try {
      await RecipeDatabase.connection
        .insert({
          id: recipe.id,
          title: recipe.title,
          description: recipe.description,
          user_id: recipe.userId,
          user_name: recipe.userName
        })
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

  async selectFeed(followId: string): Promise<recipeDB[]> {
    try {
      const result = await RecipeDatabase.connection(RecipeDatabase.TABLE_NAME)
        .select("*")
        .where({ user_id: followId })

      return result
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }

  async updateRecipe(recipe: editRecipeInput): Promise<void> {
    try {
      await RecipeDatabase.connection
        .update({ title: recipe.title, description: recipe.description })
        .where({ id: recipe.id })
        .into(RecipeDatabase.TABLE_NAME)
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }

  async deleteRecipe(recipeId: string): Promise<void> {
    try {
      await RecipeDatabase.connection(RecipeDatabase.TABLE_NAME)
        .delete()
        .where({ id: recipeId })

    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }

  async deleteUserRecipes(userId: string): Promise<void> {
    try {
      await RecipeDatabase.connection(RecipeDatabase.TABLE_NAME)
        .delete()
        .where({ user_id: userId })

    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }
}
