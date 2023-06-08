import { Router } from "express";
import { Todo } from "../Model/Model";

const router = Router();

let todosList: Todo[] = [];
router.get("/", (req, res, next) => {
  res.status(200).json({ todos: todosList });
});

router.post("/todo", (req, res, next) => {
  const newtodo: Todo = {
    id: new Date().toISOString(),
    text: req.body.text,
  };
  todosList.push(newtodo);
  res.status(200).json({ todos: todosList });
});

router.put("/todo/:todoId", (req, res, next) => {
  const id = req.params.todoId;
  const index = todosList.findIndex((each) => each.id == id);
  if (index >= 0) {
    todosList[index] = { id: id, text: req.body.text };
    return res.status(200).json({ message: "updated todo", todos: todosList });
  }

  res.status(400).json({ error: "failed" });
});

router.delete("/todo/:todoId", (req, res, next) => {
  const id = req.params.todoId;
  const newList: Todo[] = todosList.filter((each) => each.id != id);

  todosList = newList;
  return res.status(200).json({ message: "deleted todo", todos: todosList });
});

export default router;
