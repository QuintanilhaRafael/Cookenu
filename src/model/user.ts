export type user = {
  id: string,
  name: string,
  email: string,
  password: string,
  role: string
}

export enum UserRole {
  ADMIN = "admin",
  NORMAL  = "normal"
}

