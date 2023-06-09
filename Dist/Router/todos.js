"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
let todosList = [];
router.get("/", (req, res, next) => {
    res.status(200).json({ todos: todosList });
});
router.post("/todo", (req, res, next) => {
    const body = req.body;
    const newtodo = {
        id: new Date().toISOString(),
        text: body.text,
    };
    todosList.push(newtodo);
    res.status(200).json({ todos: todosList });
});
router.put("/todo/:todoId", (req, res, next) => {
    const id = req.params;
    const body = req.body;
    const index = todosList.findIndex((each) => each.id == id.todoId);
    if (index >= 0) {
        todosList[index] = { id: id.todoId, text: body.text };
        return res.status(200).json({ message: "updated todo", todos: todosList });
    }
    res.status(400).json({ error: "item is not found" });
});
router.delete("/todo/:todoId", (req, res, next) => {
    const id = req.params;
    const newList = todosList.filter((each) => each.id != id.todoId);
    todosList = newList;
    return res.status(200).json({ message: "deleted todo", todos: todosList });
});
exports.default = router;
