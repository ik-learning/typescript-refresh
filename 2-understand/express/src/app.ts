import express, { Request, Response, NextFunction } from 'express';

import todoRoutes from './routes/todos';

const app = express();

app.use('/todos', todoRoutes);

// middleware,
// todo: test me
app.use((err: Error, reg: express.Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(8000);
