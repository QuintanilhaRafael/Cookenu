export type recipe = {
  id: string,
  title: string,
  description: string,
  userId: string,
  userName: string,
}

export type recipeDB = {
  id: string,
  title: string,
  description: string,
  created_at: Date,
  user_id: string,
  user_name: string
}

export type editRecipeInput = {
  id: string,
  title: string,
  description: string
}