import { FollowRepository } from "../business/FollowRepository";
import { CustomError } from "../error/CustomError";
import { follow, followDB } from "../model/follow";
import { BaseDatabase } from "./BaseDatabase";

export class FollowDatabase extends BaseDatabase implements FollowRepository {
  private static TABLE_NAME = "cookenu_followers";

  async insertFollow(follow: follow): Promise<void> {
    try {
      await FollowDatabase.connection
        .insert({
          id: follow.id,
          user_id: follow.userId,
          user_to_follow_id: follow.userToFollowId
        })
        .into(FollowDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }

  async selectFollows(): Promise<followDB[]> {
    try {
      const result = await FollowDatabase.connection(FollowDatabase.TABLE_NAME)
        .select()

      return result;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }

  async deleteFollow(userToUnfollowId: string): Promise<void> {
    try {
      await FollowDatabase.connection(FollowDatabase.TABLE_NAME)
        .delete()
        .where({ id: userToUnfollowId })

    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }

  async deleteUserFollows(userId: string): Promise<void> {
    try {
      await FollowDatabase.connection(FollowDatabase.TABLE_NAME)
        .delete()
        .where({ user_id: userId })

    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }
}
