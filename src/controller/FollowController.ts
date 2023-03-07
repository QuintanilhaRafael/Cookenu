import { Request, Response } from "express";
import { FollowBusiness } from "../business/FollowBusiness";
import { FollowInputDTO, UnfollowInputDTO } from "../model/FollowDTO";

export class FollowController {

  constructor(private followBusiness: FollowBusiness) { }

  async createFollow(req: Request, res: Response): Promise<void> {
    try {
      const input: FollowInputDTO = {
        token: req.headers.authorization as string,
        userToFollowId: req.body.userToFollowId
      }

      await this.followBusiness.createFollow(input)

      res.status(201).send({ message: "User successfully followed." })
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    }
  }

  async deleteFollow(req: Request, res: Response): Promise<void> {
    try {
      const input: UnfollowInputDTO = {
        token: req.headers.authorization as string,
        userToUnfollowId: req.params.userToUnfollowId
      }

      await this.followBusiness.deleteFollow(input)

      res.status(201).send({ message: "User successfully unfollowed." })
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    }
  }
}
