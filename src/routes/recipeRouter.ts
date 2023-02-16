import express from 'express'
import { RecipeBusiness } from '../business/RecipeBusiness'
import { RecipeController } from '../controller/RecipeController'
import { RecipeDatabase } from '../data/RecipeDatabase'
import { UserDatabase } from '../data/UserDatabase'

export const recipeRouter = express.Router()

const userDatabase = new UserDatabase()
const recipeDatabase = new RecipeDatabase()
const recipeBusiness = new RecipeBusiness(recipeDatabase, userDatabase)
const recipeController = new RecipeController(recipeBusiness)

recipeRouter.post("/", (req, res) => recipeController.createRecipe(req, res))

recipeRouter.get("/:id", (req, res) => recipeController.getRecipe(req, res))
