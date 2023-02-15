import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { recipe } from "../model/recipe";
import { RecipeOutputDTO } from "../model/RecipeDTO";
import { LoginInputDTO, UserInputDTO } from "../model/UserDTO";

export class UserController {

  constructor(private userBusiness: UserBusiness) { }

  async signup(req: Request, res: Response): Promise<void> {
    try {
      const input: UserInputDTO = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
      }

      const token = await this.userBusiness.signup(input)

      res.status(201).send({ message: "User successfully created.", token });
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const input: LoginInputDTO = {
        email,
        password
      };

      const token = await this.userBusiness.login(input)

      res.status(200).send({ token });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

  async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization as string

      const user = await this.userBusiness.getProfile(token)

      res.status(200).send(user);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization as string
      const id = req.params.id

      const user = await this.userBusiness.getUser(token, id)

      res.status(200).send(user);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

  async getRecipesFeed(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization as string

      const recipes: RecipeOutputDTO[] = await this.userBusiness.getRecipesFeed(token)

      res.status(200).send({ recipes });
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    }
  }
}
