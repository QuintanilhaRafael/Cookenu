import { app } from "./app"
import { followRouter } from "./routes/followRouter"
import { recipeRouter } from "./routes/recipeRouter"
import { userRouter } from "./routes/userRouter"

app.use("/", userRouter)

app.use("/recipe", recipeRouter)

app.use("/follow", followRouter)