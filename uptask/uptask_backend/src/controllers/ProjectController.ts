import { Request, Response } from 'express';

import Project from '../models/project';

export class ProjectController {
  static createProject = async (req: Request, res: Response) => {
    const project = new Project(req.body);
    try {
      await project.save();
      res.json({
        msg: 'Proyecto creado',
        project,
      });
      return;
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ msg: 'Error inesperado contacte al administrador' });
      return;
    }
  };

  static getAllProjects = async (req: Request, res: Response) => {
    try {
      const projects = await Project.find({});
      res.status(200).json({ msg: 'Success get all projects', projects });
      return;
    } catch (error) {
      console.log(error);
      res.json({ msg: 'Error inesperado contacte al administrador' });
      return;
    }
  };

  static getProjectById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const project = await Project.findById(id).populate('tasks');
      if (!project) {
        const error = new Error('Proyecto no encontrado');
        res.status(404).json({ error: error.message });
        return;
      }
      res.status(200).json({ msg: 'Success get project by id', project });
      return;
    } catch (error) {
      console.log(error);
      res.json({ msg: 'Error inesperado contacte al administrador' });
      return;
    }
  };

  static updateProject = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const project = await Project.findByIdAndUpdate(id, req.body);
      if (!project) {
        const error = new Error('Proyecto no encontrado');
        res.status(404).json({ error: error.message });
        return;
      }
      await project.save();
      res.status(200).json({ msg: 'Proyecto actualizado', project });
      return;
    } catch (error) {
      console.log(error);
      res.json({ msg: 'Error inesperado contacte al administrador' });
      return;
    }
  };

  static deleteProject = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const project = await Project.findById(id);
      if (!project) {
        const error = new Error('Proyecto no encontrado');
        res.status(404).json({ error: error.message });
        return;
      }
      await project.deleteOne();
      res.status(200).json({ msg: 'Success: Delete Project', project });
      return;
    } catch (error) {
      console.log(error);
      res.json({ msg: 'Error inesperado contacte al administrador' });
      return;
    }
  };
}
