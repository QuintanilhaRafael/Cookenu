import express from 'express'
import { FollowBusiness } from '../business/FollowBusiness'
import { FollowController } from '../controller/FollowController'
import { FollowDatabase } from '../data/FollowDatabase'

export const followRouter = express.Router()

const followDatabase = new FollowDatabase()
const followBusiness = new FollowBusiness(followDatabase)
const followController = new FollowController(followBusiness)

followRouter.post("/create", (req, res) => followController.createFollow(req, res))

followRouter.delete("/delete/:userToUnfollowId", (req, res) => followController.deleteFollow(req, res))

