export interface UserInputDTO {
  name: string,
  email: string,
  password: string,
  role: string
}

export interface LoginInputDTO {
  email: string,
  password: string
}

export interface UserOutputDTO {
  id: string,
  name: string,
  email: string,
  role: string
}