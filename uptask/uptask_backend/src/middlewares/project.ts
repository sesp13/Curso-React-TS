import type { NextFunction, Request, Response } from 'express';
import Project, { IProject } from '../models/project';

declare global {
  namespace Express {
    interface Request {
      project: IProject
    }
  }
}

export async function projectExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);
    if (!project) {
      const error = new Error('Proyecto no encontrado');
      res.status(404).json({ error: error.message });
      return;
    }
    req.project = project;

    next();
    return
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Hubo un error' });
    return;
  }
}
