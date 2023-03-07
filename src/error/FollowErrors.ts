import { CustomError } from "./CustomError";

export class AlreadyFollowing extends CustomError {
    constructor(){
        super(409, "This user is already being followed.")
    }
}

export class InvalidFollow extends CustomError {
    constructor(){
        super(400, "The user cannot follow himself.")
    }
}

