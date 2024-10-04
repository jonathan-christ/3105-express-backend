import express, { urlencoded, json } from "express";
import { env } from "./config/env.ts";

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json())

app.get("/", (req, res) => {
  res.status(200).send("Hello there");
})

app.listen(env.PORT, () => {
  console.log(`Server is listening at port: ${env.PORT}`);
})