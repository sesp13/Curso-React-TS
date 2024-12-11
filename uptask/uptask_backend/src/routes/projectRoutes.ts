import { body, param } from 'express-validator';

import { ProjectController } from '../controllers/ProjectController';
import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';
import { handleInputErrors } from '../middlewares/validation';
import { projectExists } from '../middlewares/project';
import { taskBelongToProject, taskExists } from '../middlewares/task';

// BASE /api/projects
const router = Router();

router.post(
  '/',
  body('projectName')
    .notEmpty()
    .withMessage('El nombre del proyecto es obligatorio'),
  body('clientName')
    .notEmpty()
    .withMessage('El nombre del cliente es obligatorio'),
  body('description')
    .notEmpty()
    .withMessage('La descripción del proyecto es obligatoria'),
  handleInputErrors,
  ProjectController.createProject
);

router.get('/', ProjectController.getAllProjects);

router.get(
  '/:id',
  param('id').isMongoId().withMessage('El id es inválido'),
  handleInputErrors,
  ProjectController.getProjectById
);

router.put(
  '/:id',
  param('id').isMongoId().withMessage('El id es inválido'),
  body('projectName')
    .notEmpty()
    .withMessage('El nombre del proyecto es obligatorio'),
  body('clientName')
    .notEmpty()
    .withMessage('El nombre del cliente es obligatorio'),
  body('description')
    .notEmpty()
    .withMessage('La descripción del proyecto es obligatoria'),
  handleInputErrors,
  ProjectController.updateProject
);

router.delete(
  '/:id',
  param('id').isMongoId().withMessage('El id es inválido'),
  handleInputErrors,
  ProjectController.deleteProject
);

// Routes for tasks

// Todas las rutas que tengan definido el param projectId ejecutaran ese
// middleware
router.param('projectId', projectExists);

router.post(
  '/:projectId/tasks',
  body('name').notEmpty().withMessage('El nombre de la tarea es obligatoria'),
  body('description')
    .notEmpty()
    .withMessage('La descripción de la tarea es obligatoria'),
  handleInputErrors,
  TaskController.createTask
);

router.get('/:projectId/tasks', TaskController.getTasks);

// Todas las rutas que tengan definido el param taskId ejecutaran ese
// middleware
router.param('taskId', taskExists);
router.param('taskId', taskBelongToProject);

router.get(
  '/:projectId/tasks/:taskId',
  param('taskId').isMongoId().withMessage('El id es inválido'),
  handleInputErrors,
  TaskController.getTaskById
);

router.put(
  '/:projectId/tasks/:taskId',
  param('taskId').isMongoId().withMessage('El id es inválido'),
  body('name').notEmpty().withMessage('El nombre de la tarea es obligatoria'),
  body('description')
    .notEmpty()
    .withMessage('La descripción de la tarea es obligatoria'),
  handleInputErrors,
  TaskController.updateTask
);

router.delete(
  '/:projectId/tasks/:taskId',
  param('taskId').isMongoId().withMessage('El id es inválido'),
  handleInputErrors,
  TaskController.deleteTask
);

router.post(
  '/:projectId/tasks/:taskId/status',
  param('taskId').isMongoId().withMessage('El id es inválido'),
  body('status').notEmpty().withMessage('El estado es obligatorio'),
  handleInputErrors,
  TaskController.updateTaskStatus
);

export default router;
