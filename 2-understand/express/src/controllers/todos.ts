import { RequestHandler, Request, Response, NextFunction } from 'express';
import { Todo } from '../models/todo'

const TODOS: Todo[] = [];

// todo: test me
export const createTodo: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random().toString(), text);

  TODOS.push(newTodo);

  res.status(201).json({ message: 'Created the todo.', createTodo: newTodo });
};
