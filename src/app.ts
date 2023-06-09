import express from "express";
import bodyParser from "body-parser";
import TodoRouter from "./Router/todos";
const app = express();
app.use(bodyParser.json());
app.use(TodoRouter);
app.listen(3000, () => {
  console.log("connected");
});
