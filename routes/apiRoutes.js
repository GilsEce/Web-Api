const express = require("express");
const router = express.Router();
const { UserController, TodoController } = require("../controller");
const db = require("../models");

//for todos
router.get("/todos", TodoController.getAllTodos);
router.get("/todo/:id",TodoController.findTodo);
router.post("/todo/new", TodoController.addTodo);
router.patch("/todo/update/:id",TodoController.updateTodo);
router.delete("/todo/delete/:id",TodoController.deleteTodo);
router.post("/todo/delete/all", TodoController.deleteAllTodos);

//for user
router.post("/user/new",UserController.addUser);
router.get("/users", UserController.getAllUSers);


module.exports = router;
