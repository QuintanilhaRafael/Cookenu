import { Request, Response } from "express";
import { RecipeBusiness } from "../business/RecipeBusiness";
import { EditRecipeInputDTO, RecipeInputDTO } from "../model/RecipeDTO";

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

      res.status(201).send({ message: "Recipe successfully created." })
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    }
  }

  async getRecipe(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization as string
      const id = req.params.id

      const recipe = await this.recipeBusiness.getRecipe(token, id)

      res.status(200).send(recipe)
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    }
  }

  async editRecipe(req: Request, res: Response): Promise<void> {
    try {

      const input: EditRecipeInputDTO = {
        id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        token: req.headers.authorization as string
      };

      await this.recipeBusiness.editRecipe(input)

      res.status(201).send({ message: "Recipe successfully updated." })
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    }
  }

  async deleteRecipe(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization as string
      const id = req.params.id

      await this.recipeBusiness.deleteRecipe(token, id)

      res.status(200).send({ message: "Recipe successfully deleted." })
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    }
  }

}
