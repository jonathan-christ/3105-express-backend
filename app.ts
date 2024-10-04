import express, { urlencoded, json } from "express";
import { env } from "./config/env.ts";
import { userRouter } from "./routes/user.ts";

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json())

app.use("/", userRouter);

app.listen(env.PORT, () => {
  console.log(`Server is listening at port: ${env.PORT}`);
})