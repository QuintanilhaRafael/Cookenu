import { Request, Response } from "express";
import { RecipeBusiness } from "../business/RecipeBusiness";
import { RecipeInputDTO } from "../model/RecipeDTO";

export class RecipeController {

  constructor(private recipeBusiness: RecipeBusiness) { }

  async createRecipe(req: Request, res: Response): Promise<void> {
    try {
      const input: RecipeInputDTO = {
        title: req.body.title,
        description: req.body.description,
        token: req.headers.authorization as string
      }

      await this.recipeBusiness.createRecipe(input)

      res.status(201).send({ message: "Recipe successfully created." });
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    }
  }

  async getRecipe(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization as string
      const id = req.params.id

      const recipe = await this.recipeBusiness.getRecipe(token, id)

      res.status(200).send(recipe);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }
}
