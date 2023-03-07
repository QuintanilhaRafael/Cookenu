import { editRecipeInput, recipe, recipeDB } from "../model/recipe";

export interface RecipeRepository {
    insertRecipe(recipe: recipe): Promise<void>
    findRecipeById(id: string): Promise<recipeDB>
    selectFeed(followId: string): Promise<recipeDB[]>
    updateRecipe(recipe: editRecipeInput): Promise<void>
    deleteRecipe(recipeId: string): Promise<void>
    deleteUserRecipes(userId: string): Promise<void>
}