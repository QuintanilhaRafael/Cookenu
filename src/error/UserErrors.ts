import { CustomError } from "./CustomError";

export class InvalidEmail extends CustomError {
    constructor(){
        super(400, "Invalid email.")
    }
}

export class InvalidPassword extends CustomError {
    constructor(){
        super(400, "Invalid password.")
    }
}

export class InvalidName extends CustomError {
    constructor(){
        super(400, "Invalid name. It must have at least 3 characters.")
    }
}

export class UserNotFound extends CustomError{ 
    constructor(){
        super(404, "User not found.")
    }
}

export class Unauthorized extends CustomError{ 
    constructor(){
        super(401, "Unauthorized user.")
    }
}

export class InvalidRole extends CustomError{ 
    constructor(){
        super(400, "Invalid user role. It must be 'normal' or 'admin'.")
    }
}