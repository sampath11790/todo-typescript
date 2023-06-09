import { Router } from "express";
import { Todo } from "../Model/Model";
import { type } from "os";

const router = Router();
type RequestBody = {
  text: string;
};
type RequestParams = {
  todoId: string;
};

let todosList: Todo[] = [];
router.get("/", (req, res, next) => {
  res.status(200).json({ todos: todosList });
});

router.post("/todo", (req, res, next) => {
  const body = req.body as RequestBody;
  const newtodo: Todo = {
    id: new Date().toISOString(),
    text: body.text,
  };
  todosList.push(newtodo);
  res.status(200).json({ todos: todosList });
});

router.put("/todo/:todoId", (req, res, next) => {
  const id = req.params as RequestParams;
  const body = req.body as RequestBody;
  const index = todosList.findIndex((each) => each.id == id.todoId);
  if (index >= 0) {
    todosList[index] = { id: id.todoId, text: body.text };
    return res.status(200).json({ message: "updated todo", todos: todosList });
  }

  res.status(400).json({ error: "item is not found" });
});

router.delete("/todo/:todoId", (req, res, next) => {
  const id = req.params as RequestParams;

  const newList: Todo[] = todosList.filter((each) => each.id != id.todoId);

  todosList = newList;
  return res.status(200).json({ message: "deleted todo", todos: todosList });
});

export default router;
