import express from 'express';
import { addTodo, deleteTodo, getTodos } from '../controllers/todoControllers.js';

const route = express.Router();

route.get("/",getTodos);
route.post("/add",addTodo)
route.delete("/delete/:id", deleteTodo)

export default route;