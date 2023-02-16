import express from 'express'
import { UserBusiness } from '../business/UserBusiness'
import { UserController } from '../controller/UserController'
import { FollowDatabase } from '../data/FollowDatabase'
import { RecipeDatabase } from '../data/RecipeDatabase'
import { UserDatabase } from '../data/UserDatabase'

export const userRouter = express.Router()

const followDatabase = new FollowDatabase()
const recipeDatabase = new RecipeDatabase()
const userDatabase = new UserDatabase()
const userBusiness = new UserBusiness(userDatabase, followDatabase, recipeDatabase)
const userController = new UserController(userBusiness)

userRouter.post("/signup", (req, res) => userController.signup(req, res))

userRouter.post("/login", (req, res) => userController.login(req, res))

userRouter.get("/user/profile", (req, res) => userController.getProfile(req, res))

userRouter.get("/user/feed", (req, res) => userController.getRecipesFeed(req, res))

userRouter.get("/user/:id", (req, res) => userController.getUser(req, res))
