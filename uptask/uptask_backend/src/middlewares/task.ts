import type { NextFunction, Request, Response } from 'express';
import Task, { ITask } from '../models/task';

declare global {
  namespace Express {
    interface Request {
      task: ITask;
    }
  }
}

export async function taskExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);
    if (!task) {
      const error = new Error('Tarea no encontrada');
      res.status(404).json({ error: error.message });
      return;
    }
    req.task = task;

    next();
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Hubo un error' });
    return;
  }
}

export async function taskBelongToProject(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.project) {
      res.status(500).json({
        msg: 'El proyecto no ha sido definido verificar orden de middleware',
      });
      return;
    }
    if (!req.task) {
      res.status(500).json({
        msg: 'La tarea no ha sido definida verificar orden de middleware',
      });
      return;
    }

    if (req.task.project.toString() != req.project.id.toString()) {
      const error = new Error('Acción no válida');
      res.status(400).json({ msg: error.message });
      return;
    }

    next();
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Hubo un error' });
    return;
  }
}
