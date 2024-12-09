import type { Request, Response } from 'express';

import Project from '../models/project';
import Task from '../models/task';

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    try {
      const task = new Task(req.body);
      task.project = req.project.id;
      req.project.tasks.push(task.id);
      await Promise.allSettled([
        task.save(),
        // Agregar tarea el proyecto
        req.project.save(),
      ]);

      res.json({ msg: 'Tarea creada correctamente' });
      return;
    } catch (error) {
      console.log(error);
      res.json({ msg: 'Error inesperado contacte al administrador' });
      return;
    }
  };
}
