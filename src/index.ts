import { app } from "./app"
import { recipeRouter } from "./routes/recipeRouter"
import { userRouter } from "./routes/userRouter"

app.use("/", userRouter)

app.use("/recipe", recipeRouter)

