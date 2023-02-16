export interface RecipeInputDTO {
  title: string,
  description: string,
  token: string
}

export interface RecipeOutputDTO {
  id: string,
  title: string,
  description: string,
  createdAt: Date,
  userId: string,
  userName: string
}