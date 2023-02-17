import { follow, followDB } from "../model/follow";

export interface FollowRepository {
    insertFollow(follow: follow): Promise<void>
    selectFollows(): Promise<followDB[]>
    deleteFollow(userToUnfollowId: string): Promise<void>
    deleteUserFollows(userId: string): Promise<void>
}