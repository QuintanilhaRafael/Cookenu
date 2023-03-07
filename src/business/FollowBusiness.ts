import { CustomError } from "../error/CustomError"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"
import { FollowDatabase } from "../data/FollowDatabase"
import { FollowInputDTO, UnfollowInputDTO } from "../model/FollowDTO"
import { follow } from "../model/follow"
import { AlreadyFollowing, InvalidFollow } from "../error/FollowErrors"

const authenticator = new Authenticator()
const idGenerator = new IdGenerator()

export class FollowBusiness {

  constructor(private followDatabase: FollowDatabase) { }

  async createFollow(input: FollowInputDTO): Promise<void> {
    try {
      const { token, userToFollowId } = input

      if (!userToFollowId) {
        throw new CustomError(422, "userToFollowId must be provided.")
      }

      const id = idGenerator.generateId()

      const userId = authenticator.getTokenData(token).id

      const getFollows = await this.followDatabase.selectFollows()

      const findFollow = getFollows.find(follow => {
        return follow.user_id === userId && follow.user_to_follow_id === userToFollowId
      })

      if (findFollow) {
        throw new AlreadyFollowing()
      }

      if (userId === userToFollowId) {
        throw new InvalidFollow()
      }

      const follow: follow = {
        id,
        userId,
        userToFollowId
      }

      await this.followDatabase.insertFollow(follow)

    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }

  async deleteFollow(input: UnfollowInputDTO): Promise<void> {
    try {
      const { token, userToUnfollowId } = input

      if (!userToUnfollowId || !token) {
        throw new CustomError(422, "userToUnfollowId and token must be provided.")
      }

      const userId = authenticator.getTokenData(token).id

      const getFollows = await this.followDatabase.selectFollows()

      const findFollow = getFollows.find(follow => {
        return follow.user_id === userId && follow.user_to_follow_id === userToUnfollowId
      })

      if (!findFollow) {
        throw new CustomError(409, "This user is not followed yet.")
      }

      const followId = findFollow.id

      await this.followDatabase.deleteFollow(followId)

    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }

}
