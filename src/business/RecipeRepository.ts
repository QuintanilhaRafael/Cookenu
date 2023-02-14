import { recipe, recipeDB } from "../model/recipe";

export interface RecipeRepository {
    insertRecipe(recipe: recipe): Promise<void>
    findRecipeById(id: string): Promise<recipeDB>
}