import 'dotenv/config';
import express, { urlencoded, json } from "express";

const port = process.env.PORT || 8080;
const app = express();

app.use(urlencoded({ extended: true }));
app.use(json())

app.get("/", (req, res) => {
  res.status(200).send("Hello there");
})

app.listen(port, () => {
  console.log(`Server is listening at port: ${port}`);
})