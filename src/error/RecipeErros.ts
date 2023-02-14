import { CustomError } from "./CustomError";

export class InvalidDescription extends CustomError {
    constructor(){
        super(422, "The description must have at least 5 characters.")
    }
}

export class InvalidTitle extends CustomError {
    constructor(){
        super(422, "The title must have at least 3 characters.")
    }
}

export class RecipeNotFound extends CustomError{ 
    constructor(){
        super(404, "Recipe not found.")
    }
}