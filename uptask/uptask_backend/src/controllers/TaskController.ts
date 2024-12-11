import type { Request, Response } from 'express';

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

  static getTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await Task.find({ project: req.project.id }).populate(
        'project'
      );
      res.json({ msg: 'Success get all project tasks', tasks });
      return;
    } catch (error) {
      console.log(error);
      res.json({ msg: 'Error inesperado contacte al administrador' });
      return;
    }
  };

  static getTaskById = async (req: Request, res: Response) => {
    try {
      res.status(200).json({ msg: 'Obtener tarea por id', task: req.task });
      return;
    } catch (error) {
      console.log(error);
      res.json({ msg: 'Error inesperado contacte al administrador' });
      return;
    }
  };

  static updateTask = async (req: Request, res: Response) => {
    try {
      req.task.name = req.body.name;
      req.task.description = req.body.description;
      await req.task.save();

      res.status(200).json({ msg: 'Tarea actualizada correctamente' });
      return;
    } catch (error) {
      console.log(error);
      res.json({ msg: 'Error inesperado contacte al administrador' });
      return;
    }
  };

  static deleteTask = async (req: Request, res: Response) => {
    try {
      const { taskId } = req.params;

      req.project.tasks = req.project.tasks.filter(
        (task) => task.toString() !== taskId
      );

      await Promise.allSettled([req.task.deleteOne(), req.project.save()]);

      res.status(200).json({ msg: 'Tarea eliminada correctamente' });
      return;
    } catch (error) {
      console.log(error);
      res.json({ msg: 'Error inesperado contacte al administrador' });
      return;
    }
  };

  static updateTaskStatus = async (req: Request, res: Response) => {
    try {
      req.task.status = req.body.status;
      await req.task.save();
      res.json({
        msg: 'El status fue actualizado correctamente',
        task: req.task,
      });
      return;
    } catch (error) {
      console.log(error);
      res.json({ msg: 'Error inesperado contacte al administrador' });
      return;
    }
  };
}
