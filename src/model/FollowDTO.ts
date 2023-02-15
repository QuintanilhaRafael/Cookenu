export interface FollowInputDTO {
  token: string,
  userToFollowId: string
}

export interface UnfollowInputDTO {
  token: string,
  userToUnfollowId: string
}